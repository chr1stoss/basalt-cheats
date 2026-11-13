(() => {
    const header = document.querySelector('.site-header');
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.primary-nav');
    const media = window.matchMedia('(max-width: 680px)');
    const setScrolled = () => header.classList.toggle('is-scrolled', window.scrollY > 16);
    setScrolled();
    window.addEventListener('scroll', setScrolled, {passive: true});

    function closeMenu() {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Открыть меню');
        nav.classList.remove('is-open');
        document.body.classList.remove('menu-open');
    }

    toggle.addEventListener('click', () => {
        const open = toggle.getAttribute('aria-expanded') !== 'true';
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
        nav.classList.toggle('is-open', open);
        document.body.classList.toggle('menu-open', open);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => {
        if (!media.matches) closeMenu();
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeMenu();
    });
    const chips = [...document.querySelectorAll('[data-filter]')];
    const cards = [...document.querySelectorAll('.project-card')];
    chips.forEach(chip => chip.addEventListener('click', () => {
        chips.forEach(item => {
            const active = item === chip;
            item.classList.toggle('is-active', active);
            item.setAttribute('aria-pressed', String(active));
        });
        const filter = chip.dataset.filter;
        cards.forEach(card => {
            card.hidden = filter !== 'all' && card.dataset.category !== filter;
        });
    }));
    chips.forEach(chip => chip.setAttribute('aria-pressed', String(chip.classList.contains('is-active'))));
    const form = document.querySelector('#contact-form');
    form.addEventListener('submit', event => {
        event.preventDefault();
        if (!form.reportValidity()) return;
        const name = form.elements.name.value.trim();
        document.querySelector('#form-status').textContent = `Спасибо${name ? ', ' + name : ''}! Форма демонстрационная: для отправки заявок подключите почтовый или серверный обработчик.`;
        form.querySelector('button[type="submit"]').textContent = 'Запрос подготовлен ✓';
    });
})();
