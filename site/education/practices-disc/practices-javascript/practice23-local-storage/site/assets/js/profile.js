// Извлекаем данные из localStorage
let storedData = localStorage.getItem('currentTeacher');

let profileContainer = document.getElementById('profile-data');

if (storedData) {
    // Преобразуем строку обратно в объект
    let teacher = JSON.parse(storedData);
    let info = teacher.user_info;

    // Формируем HTML для вывода
    profileContainer.innerHTML = `
        <div class="profile-info">
            <h2>${info.surname} ${info.name} ${info.patronymic}</h2>
            <img src="${info.img}" alt="${info.surname}">
            <p><strong>Должность:</strong> ${info.post}</p>
            <p><strong>Категория:</strong> ${info.category}</p>
            <p><strong>Уровень образования:</strong> ${info.level_edu}</p>
            <p><strong>Стаж общий / в колледже:</strong> ${info.experience_total} / ${info.experience_college}</p>
            <p><strong>Email:</strong> <a href="mailto:${info.email}">${info.email}</a></p>
        </div>
    `;
} else {
    // Если данных нет (например, пользователь зашел напрямую)
    profileContainer.innerHTML = `
        <h3>Данные не найдены.</h3>
        <p>Пожалуйста, авторизуйтесь на <a href="index.html">главной странице</a>.</p>
    `;
}