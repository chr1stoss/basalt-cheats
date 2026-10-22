'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const row = document.querySelector('.row');
    const counter = document.getElementById('city-count');

    if (!row || !Array.isArray(window.obj) || window.obj.length === 0) {
        if (counter) counter.textContent = 'Данные пока недоступны';
        return;
    }

    function createCityCard(city) {
        const card = document.createElement('article');
        card.className = 'col';

        const imageFrame = document.createElement('div');
        imageFrame.className = 'city-image-frame';
        const image = document.createElement('img');
        image.loading = 'lazy';
        image.alt = `Вид города: ${city.name}`;
        image.src = city.img;
        image.width = 900;
        image.height = 620;
        imageFrame.append(image);

        const content = document.createElement('div');
        content.className = 'city-copy';
        const eyebrow = document.createElement('p');
        eyebrow.className = 'city-eyebrow';
        const heading = document.createElement('h3');
        const description = document.createElement('p');
        description.className = 'city-description';
        const footer = document.createElement('div');
        footer.className = 'city-card-foot';
        const label = document.createElement('span');
        label.textContent = 'CITY GUIDE';
        const arrow = document.createElement('span');
        arrow.className = 'city-arrow';
        arrow.setAttribute('aria-hidden', 'true');
        arrow.textContent = '↗';
        footer.append(label, arrow);
        content.append(eyebrow, heading, description, footer);
        card.append(imageFrame, content);
        return card;
    }

    function fillCityCard(card, city, index) {
        const image = card.querySelector('img');
        const eyebrow = card.querySelector('.city-eyebrow');
        const heading = card.querySelector('h3');
        const description = card.querySelector('.city-description');
        if (image) {
            image.src = city.img;
            image.alt = `Вид города: ${city.name}`;
        }
        if (eyebrow) eyebrow.textContent = `DESTINATION / ${String(index + 1).padStart(2, '0')}`;
        if (heading) heading.textContent = city.name;
        if (description) description.textContent = city.text;
        card.dataset.city = city.name;
    }

    const firstCard = createCityCard(window.obj[0]);
    fillCityCard(firstCard, window.obj[0], 0);

    const fragment = document.createDocumentFragment();
    fragment.append(firstCard);

    for (let index = 1; index < window.obj.length; index += 1) {
        const clonedCard = firstCard.cloneNode(true);
        fillCityCard(clonedCard, window.obj[index], index);
        fragment.append(clonedCard);
    }

    row.append(fragment);
    if (counter) counter.textContent = `${window.obj.length} городов в подборке`;
});