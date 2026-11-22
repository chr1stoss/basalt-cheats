let login = prompt("Введите ваш логин:");

if (login !== null) {
    let password = prompt("Введите ваш пароль:");

    if (password !== null) {
        // Ищем пользователя в массиве
        let foundUser = personnel.find(user => 
            user.authorization.login === login && 
            user.authorization.password === password
        );

        let resultContainer = document.getElementById('result');
        
        if (foundUser) {
            // Сохраняем объект в localStorage
            localStorage.setItem('currentTeacher', JSON.stringify(foundUser));

            // Выводим кнопку перехода
            resultContainer.innerHTML = `
                <h3>Преподаватель с учетными данными найден в системе</h3>
                <a href="profile.html" class="button">Перейти в профиль</a>
            `;
        } else {
            // Сообщение, если не найден
            resultContainer.innerHTML = `
                <h3>К сожалению, такой преподаватель в системе не найден. Нам очень жаль</h3>
                <p>Но у нас есть другие, ничуть не хуже... ;)</p>
            `;
        }
    }
}