(() => {
    const stage = document.querySelector('#device-stage');
    const wrap = document.querySelector('#device-wrap');
    const layers = [...document.querySelectorAll('.device-layer')];
    const layerButtons = [...document.querySelectorAll('[data-show-layer]')];
    const explosionToggle = document.querySelector('#explosion-toggle');
    const status = document.querySelector('#layer-status');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarse = window.matchMedia('(pointer: coarse)');
    let rotationFrame = 0;
    let pointer = {x: 0, y: 0};
    let rotation = {x: -57, z: -28};
    let isExploded = true;
    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    function paintRotation() {
        rotationFrame = 0;
        if (reduced.matches) return;
        wrap.style.transform = `rotateX(${rotation.x}deg) rotateZ(${rotation.z}deg)`;
    }

    stage.addEventListener('pointermove', event => {
        if (coarse.matches || reduced.matches || stage.classList.contains('focus-layer')) return;
        const bounds = stage.getBoundingClientRect();
        pointer.x = (event.clientX - bounds.left) / bounds.width - .5;
        pointer.y = (event.clientY - bounds.top) / bounds.height - .5;
        rotation.x = clamp(-57 + pointer.y * 12, 40, -60);
        rotation.z = clamp(28 - pointer.x * 12, 14, 60);
        if (!rotationFrame) rotationFrame = requestAnimationFrame(paintRotation);
    });
    stage.addEventListener('pointerleave', () => {
        rotation.x = 57;
        rotation.z = -28;
        if (!rotationFrame) rotationFrame = requestAnimationFrame(paintRotation);
    });
    const magnet = document.querySelector('.magnetic-button');
    magnet.addEventListener('pointermove', event => {
        if (coarse.matches || reduced.matches) return;
        const r = magnet.getBoundingClientRect();
        magnet.style.setProperty('--mouse-x', `${(event.clientX - r.left - r.width / 2) * .12}px`);
        magnet.style.setProperty('--mouse-y', `${(event.clientY - r.top - r.height / 2) * .12}px`);
    });
    magnet.addEventListener('pointerleave', () => {
        magnet.style.setProperty('--mouse-x', '0px');
        magnet.style.setProperty('--mouse-y', '0px');
    });

    function setExploded(value) {
        isExploded = value;
        stage.classList.toggle('is-assembled', !value);
        explosionToggle.setAttribute('aria-pressed', String(value));
        explosionToggle.innerHTML = value ? 'Собрать конструкцию <span>＋</span>' : 'Разобрать конструкцию <span>↗</span>';
        stage.classList.remove('focus-layer');
        layers.forEach(layer => layer.classList.remove('is-focused'));
        layerButtons.forEach(button => button.classList.toggle('is-active', button.dataset.showLayer === 'all'));
        status.textContent = value ? 'Система разобрана: четыре слоя отделены друг от друга.' : 'Конструкция собрана: слои расположены в рабочем положении.';
    }

    explosionToggle.addEventListener('click', () => setExploded(!isExploded));
    layerButtons.forEach(button => button.addEventListener('click', () => {
        const selection = button.dataset.showLayer;
        layerButtons.forEach(item => item.classList.toggle('is-active', item === button));
        if (selection === 'all') {
            stage.classList.remove('focus-layer');
            layers.forEach(layer => layer.classList.remove('is-focused'));
            status.textContent = isExploded ? 'Система разобрана: четыре слоя отделены друг от друга.' : 'Конструкция собрана: слои расположены в рабочем положении.';
            return;
        }
        setExploded(true);
        stage.classList.add('focus-layer');
        layers.forEach(layer => layer.classList.toggle('is-focused', layer.dataset.layer === selection));
        const labels = ['Шасси — внешний защитный корпус.', 'Плата — вычислительное и управляющее ядро.', 'Охлаждение — тепловой контур и вентиляторы.', 'Оптическая панель — верхний защитный слой.'];
        status.textContent = labels[Number(selection)];
        layerButtons.forEach(item => item.classList.toggle('is-active', item === button));
    }));
    // На устройствах без точного hover движения отключаются, чтобы не мешать работе с экраном.
    if (coarse.matches && !reduced.matches) {
        let idleAngle = 0;
        let idleFrame = 0;
        const sway = () => {
            if (stage.matches(':hover') || stage.classList.contains('focus-layer')) {
                idleFrame = requestAnimationFrame(sway);
                return;
            }
            idleAngle += .005;
            rotation.z = 28 + Math.sin(idleAngle) * 2.4;
            rotation.x = 57 + Math.cos(idleAngle * .7) * 1.8;
            if (!rotationFrame) rotationFrame = requestAnimationFrame(paintRotation);
            idleFrame = requestAnimationFrame(sway);
        };
        if (!reduced.matches) idleFrame = requestAnimationFrame(sway);
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && idleFrame) cancelAnimationFrame(idleFrame); else if (!document.hidden && !reduced.matches) idleFrame = requestAnimationFrame(sway);
        });
    }
    reduced.addEventListener?.('change', event => {
        if (event.matches) {
            wrap.style.transform = '';
        }
    });
})();
