'use strict';

const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = Number(process.env.PORT || 3000);
const USERS_FILE = path.join(__dirname, 'users.json');

// =================================================================
// 1. Шаблонизатор и middleware
// =================================================================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: 'my_super_secret_key_123',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 3600000}
}));

// =================================================================
// 2. Хранилище users.json
// =================================================================
function loadUsers() {
    try {
        if (!fs.existsSync(USERS_FILE)) return [];
        return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
    } catch (err) {
        console.error('Ошибка чтения users.json:', err);
        return [];
    }
}

function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
}

// =================================================================
// 3. Middleware: авторизация и проверка роли
// =================================================================
function requireAuth(req, res, next) {
    if (req.session && req.session.user) return next();
    res.redirect('/login');
}

function requireAdmin(req, res, next) {
    const u = req.session && req.session.user;
    if (u && u.role === 'admin') return next();
    res.status(403).render('403', {user: u || null});
}

// =================================================================
// 4. Публичные маршруты
// =================================================================
app.get('/', (req, res) => {
    res.render('index', {user: req.session.user || null});
});

app.get('/register', (req, res) => {
    if (req.session.user) return res.redirect('/');
    res.render('register', {error: null});
});

app.post('/register', async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.render('register', {error: 'Заполните все поля!'});
    }
    if (password.length < 6) {
        return res.render('register', {
            error: 'Пароль должен содержать минимум 6 символов!'
        });
    }

    const users = loadUsers();
    if (users.find(u => u.username === username)) {
        return res.render('register', {
            error: 'Пользователь с таким именем уже существует!'
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const role = users.length === 0 ? 'admin' : 'user';

    const newUser = {
        id: Date.now(),
        username,
        password: hashedPassword,
        role
    };
    users.push(newUser);
    saveUsers(users);

    req.session.user = {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role
    };
    res.redirect('/');
});

app.get('/login', (req, res) => {
    if (req.session.user) return res.redirect('/');
    res.render('login', {error: null});
});

app.post('/login', async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.render('login', {error: 'Заполните все поля!'});
    }

    const user = loadUsers().find(u => u.username === username);
    if (!user) {
        return res.render('login', {
            error: 'Неверное имя пользователя или пароль!'
        });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.render('login', {
            error: 'Неверное имя пользователя или пароль!'
        });
    }

    req.session.user = {
        id: user.id,
        username: user.username,
        role: user.role || 'user'
    };
    res.redirect('/');
});

app.get('/dashboard', requireAuth, (req, res) => {
    res.render('dashboard', {user: req.session.user});
});

// =================================================================
// 5. Админ-панель (RBAC)
// =================================================================
app.get('/admin', requireAuth, requireAdmin, (req, res) => {
    res.render('admin', {
        user: req.session.user,
        users: loadUsers(),
        ok: req.query.ok || null,
        err: req.query.err || null
    });
});

app.post('/admin/delete/:id', requireAuth, requireAdmin, (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isFinite(id)) {
        return res.redirect('/admin?err=invalid');
    }
    if (req.session.user.id === id) {
        return res.redirect('/admin?err=self');
    }

    const users = loadUsers();
    const filtered = users.filter(u => u.id !== id);
    if (filtered.length === users.length) {
        return res.redirect('/admin?err=notfound');
    }
    saveUsers(filtered);
    res.redirect('/admin?ok=deleted');
});

// =================================================================
// 6. Выход и запуск
// =================================================================
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) console.error('Ошибка при завершении сессии:', err);
        res.redirect('/');
    });
});

app.listen(PORT, () => {
    console.log(`PR16 RBAC running → http://localhost:${PORT}`);
});