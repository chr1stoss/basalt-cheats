# Basalt Cheats (education version)

Многостраничная витрина магазина приватных читов: **PHP + MySQL**, RU/EN, покупка по цепочке **игры → модули → планы → checkout**.

**Stack:** PHP 8.x (XAMPP / Apache), MariaDB/MySQL, vanilla JS (точечно), CSS.

**Мобильные устройства:** витрина и практики под `site/` редиректят на [`site/mobile-blocked.php`](site/mobile-blocked.php). Для локальной проверки с эмуляцией телефона в DevTools: `?desktop=1` (cookie на 24 ч).

**DevTools:** client-side guard в [`site/assets/js/devtools-guard.js`](site/assets/js/devtools-guard.js) (горячие клавиши, ПКМ, overlay при открытой панели). Полная блокировка в браузере невозможна при отключенном JS.

---

## Quick start (XAMPP)

1. DocumentRoot или alias на [`site/`](site/) (типичный URL: `http://localhost/new-age/official/site/`).
2. Импорт SQL (phpMyAdmin или CLI):
   - **Все сразу:** [`site/database/FULL.sql`](site/database/FULL.sql) — `basalt_cheats` + практики (рекомендуется)
   - **Поштучно:** [`basalt_cheats.sql`](site/database/basalt_cheats.sql), [`practice10.sql`](site/database/practice10.sql), [`db_sweetty.sql`](site/education/practices-disc-legacy/practice10-sweetty/dump/db_sweetty.sql), [`practice13.sql`](site/education/practices-disc-legacy/practice13-music/dump/practice13.sql)
3. Настройки подключения: [`site/config/database.php`](site/config/database.php) и при необходимости `DB_*` в окружении.
4. Base path для подпапки Apache: [`site/config/site.yaml`](site/config/site.yaml) → `web_base`.

### Базы данных

| БД | Назначение | Config |
|----|------------|--------|
| `basalt_cheats` | Каталог, заказы, контент | `database.php` |
| `db_sweetty` | iframe Sweetty 7.9 / 7.10 | `database_sweetty.php` |
| `basalt_practice13` | Музыкальный каталог ПР13 | `database_practice13.php` |
| `wp_lab` | Отдельная установка WordPress для практик WP1–WP5 | `wp-config.php` (вне репо) |

### Практики (меню «⋯»)

- Ранние практики `site/`, `site/components/`, `site/config/`, `site/database/` и др
- ПР8: `site/education/practices-disc-legacy/practice8-iframe/`site/*`
- ПР10: `site/education/practices-disc-legacy/practice10-sweetty/site/*`
- ПР11: `site/education/practices-disc-legacy/practice11-victory/site/*`
- ПР12: `site/education/practices-disc-legacy/practice12-async/site/*`
- ПР13: `site/education/practices-disc-legacy/practice13-music/site/*`

- ПР14: `site/education/practices-disc/practices-express/practice14-requests/site/*`
- ПР15: `site/education/practices-disc/practices-express/practice15-auth/site/*`
- ПР16: `site/education/practices-disc/practices-express/practice16-rbac/site/*`
- ПР17: `site/education/practices-disc/practices-none-sort/practice17-portfolio/site/*`
- ПР18: `site/education/practices-disc/practices-express/practice18-gateways/site/*`

- WP1: `site/education/practices-interfaces/practices-wordpress/practice-wp1.php`
- WP2: `site/education/practices-interfaces/practices-wordpress/practice-wp2.php`
- WP3: `site/education/practices-interfaces/practices-wordpress/practice-wp3.php`
- WP4: `site/education/practices-interfaces/practices-wordpress/practice-wp4.php`
- WP5: `site/education/practices-interfaces/practices-wordpress/practice-wp5.php`

- ПР6: `site/education/practices-interfaces/practices-layout/practice6-landing/site/*`
- ПР7: `site/education/practices-interfaces/practices-layout/practice7-landing-layout/site/*`
- ПР8: `site/education/practices-interfaces/practices-layout/practice8-landing-positivus/site/*`

```text
Со средой Basalt Cheats решения практик совместимы благодаря файлам-коннекторам:
Они находятся внутри директорий решений на уровне с директорией site/ и называются practice-connector.php
Функционируют следующим образом:

  1. Подключаются к site/bootstrap.php для получения настроек адаптации, стилей и выполнения доп. скриптов среды (site/inc/mobile-guard.php и site/assets/js/devtools-guard.js)
  2. Подключаются к site/components/header.php и /footer.php для создания навигационной панели из header.php и футера из footer.php
  3. Создают на уже готовой трафаретной странице frame-блок, в который через asset(); передется site/index.php (или .html) самого решения практики
  4. Прогрузка frame с решением

Примечание 1: Это работает со всеми группами решений, включая Node.js Express и Wordpress
Примечание 2: Коннектор не сделан только для legacy 8 практики и более ранних которые являются частью среды Basalt Cheats (например работа с БД из legacy 10 db была встроена в основу через ключевые файлы: site/index.html, site/connect.php и site/config/database.php)
Примечание 3: WordPress для WP1–WP5 разворачивается отдельно: `c:\xampp\htdocs\wp-lab\`, БД `wp_lab` (создать вручную), дочерняя тема `my-child-theme`.
```

```text
WordPress для WP1–WP5 разворачивается отдельно: `c:\xampp\htdocs\wp-lab\`,
БД `wp_lab` (создать вручную), дочерняя тема `my-child-theme`,
Установить плагины для wordpress:
 1. akismet
 2. google-listings-and-ads
 3. klaviyo
 4. bbpress
 5. woocommerce
 6. woocommerce-paypal-payments
 7. woocommerce-pdf-invoices-packing-slips
 8. pinterest-for-woocommerce
 9. reddit-for-woocommerce
```

---

## Docker

Из корня `basalt-cheats/`:

```bash
docker compose up -d --build
make import-sql
```

---

## WordPress-практики (WP1–WP5)

Практики WP1–WP5 требуют **отдельной установки WordPress** вне репозитория.
Обертки `site/education/practices-interfaces/practices-wordpress/practice-wp{1..5}.php` используют iframe на локальный WP.

В директории basalt-cheats/wp-lab/ для ознакомления оставил только две директории:

| Директория | Значение |
|------------|----------|
| `basalt-cheats\wp-lab\wp-content\plugins\` | Оставил три директории основных плагинов (самих плагинов нет, только их названия и readme.txt для уменьшения объема проекта репозитория GitHub – для выполнения практических работ WP1-WP5 |
| `basalt-cheats\wp-lab\wp-content\themes\` | Оставил `...\my-child-theme\` (`functions.php`, `style.css`), необходимую для выполнения практических работ |

### 1. Создайте БД

В phpMyAdmin или через MySQL CLI:

```sql
CREATE DATABASE wp_lab CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Установите WordPress

* Скачать: https://ru.wordpress.org/download/
* Распаковать в c:\xampp\htdocs\wp-lab\
* Открыть http://localhost/wp-lab/, пройти мастер установки:
    * БД: wp_lab
    * Пользователь MySQL: root (пароль пустой — дефолт XAMPP)
    * Префикс таблиц: wp_
* Настройки → Постоянные ссылки → выбрать «Название записи» (/%postname%/).

### 3. Плагины

Активировать по порядку:
| Практика | Плагин |
|----------|--------|
| WP3, WP4 | WooCommerce |
| WP4 | PDF Invoices & Packing Slips for WooCommerce |
| WP5 | bbPress |

### 4. Дочерняя тема

Скопировать `my-child-theme/` из репозитория в
`wp-lab/wp-content/themes/my-child-theme/` и активировать в
**Внешний вид → Темы**.

### 5. Открыть обертки

- `http://localhost/site/practice-wp1.php` — WordPress Basics
- `http://localhost/site/practice-wp2.php` — Landing Page
- `http://localhost/site/practice-wp3.php` — WooCommerce
- `http://localhost/site/practice-wp4.php` — Checkout
- `http://localhost/site/practice-wp5.php` — bbPress

---

## Commands

```bash
make lint
```

`php -l` для всех `site/**/*.php`.

---

## Project layout

```
basalt-cheats/edu/
├── site/
│   ├── assets/
│   ├── components/
│   ├── actions/
│   ├── config/
│   ├── database/
│   └── education
│       ├── practices-disc/                             # РКИС (3 курс)
│       │   ├── practices-express/
│       │   └── practices-none-sort/                    # Портфолио
│       ├── practices-disc-legacy/                      # РКИС (2 курс)
│       │   ├── practice8-iframe/
│       │   ├── practice10-sweetty/
│       │   │   ├── part-1/                             # ex. Sweetty 7.9
│       │   │   └── part-2/                             # ex. Sweetty 7.10
│       │   ├── practice11-victory/
│       │   │   ├── part-1/                             # День победы
│       │   │   └── part-2/                             # День победы (города-герои)
│       │   ├── practice12-async/
│       │   └── practice13-music/
│       └── practices-interfaces/                       # ПиРИС (3 курс)
│           ├── practices-layout/
│           │   ├── practice6-landing/
│           │   │   ├── part-1/                         # Верстка
│           │   │   └── part-2/                         # Добавление кинетики
│           │   ├── practice7-landing-layout/      
│           │   └── practice8-landing-positivus/        # ПиРИС (3 курс)
│           └── practices-wordpress/                    # Wordpress 1-4
├── wp_lab/
│   └── wp-content/
│       └── themes/
│           └── my-child-theme/                         # Тема для Landing pages
│               ├── functions.php
│               └── style.css
├── .dockerignore
├── .env.example
├── .gitignore
├── .pre-commit-config.yaml
├── docker-compose.override.example.yaml
├── docker-compose.yml
├── Dockerfile
├── LICENSE
├── Makefile
├── package-lock.json
├── CHANGELOG.md
├── DEVELOPMENT.md
├── IMAGES.md
└── README.md
```

---

## Documentation

- [`IMAGES.md`](IMAGES.md) — пути к изображениям
- `DEVELOPMENT.md`, `CHANGELOG.md`

---

## License

MIT LICENSE.
