'use strict';

const path = require('path');
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

app.use(
    express.static(PUBLIC_DIR, {
        extensions: ['html'],   // /about -> /about.html
        index: 'index.html',    // / -> index.html
    })
);

// 404
app.use((req, res) => {
    res.status(404).type('text/plain').send(`404 Not Found: ${req.url}`);
});

// Ошибки
app.use((err, req, res, next) => {
    console.error(err);
    const status = err.code === 'ENOENT' ? 404 : (err.status || 500);
    res.status(status).type('text/plain').send(`${status} ${err.message}`);
});

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});