'use strict';

const products = [
    {
        id: 1,
        name: 'Prism 75',
        category: 'keyboards',
        layout: '75',
        price: 18900,
        badge: 'ХИТ',
        finish: 'Frost / Tactile',
        image: 'keyboard-01.svg'
    },
    {
        id: 2,
        name: 'Aurora 65',
        category: 'keyboards',
        layout: '60',
        price: 16400,
        badge: 'NEW',
        finish: 'Lilac / Linear',
        image: 'keyboard-02.svg'
    },
    {
        id: 3,
        name: 'Noir TKL',
        category: 'keyboards',
        layout: 'tkl',
        price: 21900,
        badge: 'LIMITED',
        finish: 'Graphite / Silent',
        image: 'keyboard-03.svg'
    },
    {
        id: 4,
        name: 'Retro 60',
        category: 'keyboards',
        layout: '60',
        price: 12900,
        badge: '',
        finish: 'Cream / Clicky',
        image: 'keyboard-04.svg'
    },
    {
        id: 5,
        name: 'Arc Pro 98',
        category: 'keyboards',
        layout: 'tkl',
        price: 27900,
        badge: 'PRO',
        finish: 'Black / Linear',
        image: 'keyboard-05.svg'
    },
    {
        id: 6,
        name: 'Moss 75',
        category: 'keyboards',
        layout: '75',
        price: 17600,
        badge: '',
        finish: 'Sage / Tactile',
        image: 'keyboard-06.svg'
    },
    {
        id: 7,
        name: 'Mono 65',
        category: 'keyboards',
        layout: '60',
        price: 14900,
        badge: '',
        finish: 'Mono / Linear',
        image: 'keyboard-07.svg'
    },
    {
        id: 8,
        name: 'Studio TKL',
        category: 'keyboards',
        layout: 'tkl',
        price: 23900,
        badge: '',
        finish: 'Stone / Tactile',
        image: 'keyboard-08.svg'
    },
    {
        id: 9,
        name: 'Cloud Linear',
        category: 'switches',
        layout: '',
        price: 2900,
        badge: 'PACK × 35',
        finish: '45 g · Smooth',
        image: 'switches-01.svg'
    },
    {
        id: 10,
        name: 'Pebble Tactile',
        category: 'switches',
        layout: '',
        price: 3400,
        badge: 'PACK × 35',
        finish: '55 g · Crisp',
        image: 'switches-02.svg'
    },
    {
        id: 11,
        name: 'Coiled Cable',
        category: 'accessories',
        layout: '',
        price: 2500,
        badge: '',
        finish: 'USB-C · 1.8 m',
        image: 'accessory-01.svg'
    },
    {
        id: 12,
        name: 'Desk Mat / Moss',
        category: 'accessories',
        layout: '',
        price: 3900,
        badge: '',
        finish: '900 × 400 mm',
        image: 'accessory-02.svg'
    }
];
const categoryNames = {keyboards: 'KEYBOARD', switches: 'SWITCHES', accessories: 'ACCESSORY'};
const formatter = new Intl.NumberFormat('ru-RU');
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const grid = $('#product-grid');
const count = $('#results-count');
const empty = $('#empty-state');
const toast = $('#toast');
const cart = new Map();
const favourites = new Set();
let toastTimer;

function money(value) {
    return `${formatter.format(value)} ₽`;
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2400);
}

function selectedValues(name) {
    return $$(`input[name="${name}"]:checked`).map(input => input.value);
}

function renderProducts() {
    const search = $('#search-input').value.trim().toLocaleLowerCase('ru-RU');
    const categories = selectedValues('category');
    const layouts = selectedValues('layout');
    const maxPrice = Number($('#price-range').value);
    const sort = $('#sort-select').value;
    let visible = products.filter(product => {
        const matchesSearch = `${product.name} ${product.finish} ${categoryNames[product.category]}`.toLocaleLowerCase('ru-RU').includes(search);
        const matchesCategory = categories.includes(product.category);
        const matchesLayout = product.category !== 'keyboards' || layouts.length === 0 || layouts.includes(product.layout);
        return matchesSearch && matchesCategory && matchesLayout && product.price <= maxPrice;
    });
    if (sort === 'price-asc') visible.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') visible.sort((a, b) => b.price - a.price);
    if (sort === 'name') visible.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    grid.replaceChildren();
    const fragment = document.createDocumentFragment();
    visible.forEach(product => {
        const card = document.createElement('article');
        card.className = 'product-card';
        const art = document.createElement('div');
        art.className = 'product-art';
        const image = document.createElement('img');
        image.src = `assets/img/keyboards/${product.image}`;
        image.alt = product.category === 'keyboards' ? `Клавиатура ${product.name}` : product.name;
        image.loading = 'lazy';
        image.width = 720;
        image.height = 680;
        art.append(image);
        if (product.badge) {
            const badge = document.createElement('span');
            badge.className = 'product-badge';
            badge.textContent = product.badge;
            art.append(badge);
        }
        const favourite = document.createElement('button');
        favourite.type = 'button';
        favourite.className = 'favorite-btn';
        favourite.textContent = favourites.has(product.id) ? '♥' : '♡';
        favourite.setAttribute('aria-label', favourites.has(product.id) ? 'Убрать из избранного' : 'В избранное');
        favourite.setAttribute('aria-pressed', String(favourites.has(product.id)));
        favourite.addEventListener('click', () => {
            if (favourites.has(product.id)) favourites.delete(product.id); else favourites.add(product.id);
            renderProducts();
            showToast(favourites.has(product.id) ? 'Добавлено в избранное' : 'Удалено из избранного');
        });
        art.append(favourite);
        const meta = document.createElement('div');
        meta.className = 'product-meta';
        const category = document.createElement('span');
        category.textContent = categoryNames[product.category];
        const layout = document.createElement('span');
        layout.textContent = product.layout ? product.layout.toUpperCase() : 'SELECTED';
        meta.append(category, layout);
        const name = document.createElement('h3');
        name.textContent = product.name;
        const bottom = document.createElement('div');
        bottom.className = 'product-bottom';
        const price = document.createElement('strong');
        price.className = 'product-price';
        price.textContent = money(product.price);
        const add = document.createElement('button');
        add.type = 'button';
        add.className = 'add-btn';
        add.textContent = '+';
        add.setAttribute('aria-label', `Добавить ${product.name} в корзину`);
        add.addEventListener('click', () => {
            cart.set(product.id, (cart.get(product.id) || 0) + 1);
            updateCartCount();
            showToast(`${product.name} добавлен в корзину`);
        });
        bottom.append(price, add);
        card.append(art, meta, name, bottom);
        fragment.append(card);
    });
    grid.append(fragment);
    count.textContent = `${visible.length} ${visible.length === 1 ? 'предмет' : visible.length > 1 && visible.length < 5 ? 'предмета' : 'предметов'}`;
    empty.hidden = visible.length !== 0;
    grid.hidden = visible.length === 0;
}

function updateCartCount() {
    const total = [...cart.values()].reduce((sum, quantity) => sum + quantity, 0);
    $('#cart-count').textContent = String(total);
}

function showCart() {
    const target = $('#cart-items');
    target.replaceChildren();
    let total = 0;
    const entries = [...cart.entries()];
    if (!entries.length) {
        const message = document.createElement('p');
        message.className = 'muted';
        message.textContent = 'Пока ничего нет. Добавь первый предмет из каталога.';
        target.append(message);
    }
    entries.forEach(([id, quantity]) => {
        const product = products.find(item => item.id === id);
        if (!product) return;
        total += product.price * quantity;
        const line = document.createElement('div');
        line.className = 'cart-line';
        const description = document.createElement('span');
        description.textContent = product.name;
        const detail = document.createElement('small');
        detail.textContent = `${quantity} × ${money(product.price)}`;
        description.append(detail);
        const subtotal = document.createElement('strong');
        subtotal.textContent = money(product.price * quantity);
        line.append(description, subtotal);
        target.append(line);
    });
    $('#cart-total').textContent = money(total);
    const dialog = $('#cart-dialog');
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else showToast(`В корзине: ${$('#cart-count').textContent} шт.`);
}

function setFilterPanel(open) {
    const panel = $('#filters-panel');
    const trigger = $('#filters-open');
    const overlay = $('#filter-overlay');
    panel.classList.toggle('is-open', open);
    trigger.setAttribute('aria-expanded', String(open));
    overlay.hidden = !open;
    document.body.classList.toggle('filters-open', open);
    if (open) $('#filters-close').focus(); else trigger.focus({preventScroll: true});
}

$('#search-input').addEventListener('input', renderProducts);
$$('input[name="category"], input[name="layout"]').forEach(input => input.addEventListener('change', renderProducts));
$('#price-range').addEventListener('input', event => {
    $('#price-output').textContent = money(Number(event.target.value));
    renderProducts();
});
$('#sort-select').addEventListener('change', renderProducts);
$('#clear-filters').addEventListener('click', clearFilters);
$('#empty-reset').addEventListener('click', clearFilters);
$('#theme-toggle').addEventListener('click', () => {
    const root = document.documentElement;
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = theme;
    try {
        localStorage.setItem('keebcraft-theme', theme);
    } catch (_) { /* storage may be disabled */
    }
});
$('#filters-open').addEventListener('click', () => setFilterPanel(true));
$('#filters-close').addEventListener('click', () => setFilterPanel(false));
$('#filter-overlay').addEventListener('click', () => setFilterPanel(false));
$('#cart-open').addEventListener('click', showCart);
$('#cart-dialog').addEventListener('click', event => {
    if (event.target === event.currentTarget) event.currentTarget.close();
});
window.addEventListener('keydown', event => {
    if (event.key === 'Escape' && $('#filters-panel').classList.contains('is-open')) setFilterPanel(false);
});

function clearFilters() {
    $$('input[name="layout"]').forEach(input => {
        input.checked = false;
    });
    $$('input[name="category"]').forEach(input => {
        input.checked = true;
    });
    $('#search-input').value = '';
    $('#price-range').value = '30000';
    $('#price-output').textContent = money(30000);
    $('#sort-select').value = 'featured';
    renderProducts();
    if (window.matchMedia('(max-width: 767px)').matches) setFilterPanel(false);
}

try {
    const savedTheme = localStorage.getItem('keebcraft-theme');
    if (savedTheme === 'dark' || savedTheme === 'light') document.documentElement.dataset.theme = savedTheme;
} catch (_) { /* theme still works for the current session */
}
renderProducts();
