class NewsCountError extends Error {
  constructor(value) {
    super(`Ожидалось целое число от 1 до 12; получено: ${String(value)}`);
    this.name = 'NewsCountError';
    this.description = 'Количество тизеров должно быть целым числом в диапазоне 1–12.';
    this.userMessage = 'Не удалось показать ленту: введите целое число от 1 до 12.';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const target = document.querySelector('#content');
  const message = document.querySelector('#pageMessage');
  const form = document.querySelector('#countForm');
  const input = document.querySelector('#newsCount');

  function showMessage(text, kind='error') {
    message.textContent = text;
    message.dataset.kind = kind;
    message.hidden = false;
  }
  function render(count) {
    target.replaceChildren();
    for (let i = 0; i < count; i += 1) {
      const item = NEWS_DATA[i];
      const card = document.createElement('div');
      card.className = 'news-card';
      const image = document.createElement('img');
      image.src = item.image;
      image.alt = `Иллюстрация к новости: ${item.name}`;
      image.width = 480;
      image.height = 400;
      image.loading = i < 3 ? 'eager' : 'lazy';
      const date = document.createElement('span');
      date.textContent = item.date;
      const heading = document.createElement('h3');
      heading.textContent = item.name;
      const description = document.createElement('p');
      description.textContent = item.text;
      // Разметка тизера соответствует условию практической работы.
      card.append(image, date, heading, description);
      target.append(card);
    }
    message.hidden = true;
    form.hidden = true;
  }
  function validateAndRender(value) {
    const count = Number(String(value).trim());
    if (!Number.isInteger(count) || count < 1 || count > 12) throw new NewsCountError(value);
    render(count);
  }
  function handleError(error) {
    console.error(`${error.name}: ${error.message}
${error.description}`);
    showMessage(error.userMessage || 'Произошла ошибка при обработке ввода.');
    form.hidden = false;
    input.focus();
  }
  function ask() {
    const answer = window.prompt('Сколько новостей показать? Введите число от 1 до 12.', '3');
    if (answer === null) {
      showMessage('Ввод отменён. Укажите количество новостей в форме ниже.', 'info');
      form.hidden = false;
      return;
    }
    try { validateAndRender(answer); }
    catch (error) { handleError(error); }
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    try { validateAndRender(input.value); }
    catch (error) { handleError(error); }
  });
  ask();
});
