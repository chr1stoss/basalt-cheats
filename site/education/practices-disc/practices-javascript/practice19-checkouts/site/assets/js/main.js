// 1. Создаем исходный JS-объект заказа
let order = {
    user: {
        name: "Павел",
        surname: "Волков",
        email: "p-volkoff@mail.ru",
        phone: "8(912)552-92-25"
    },
    order_info: {
        order_date: "07.01.2023",
        delivery_type: "По адресу",
        discount: "10%",
        total_price: "",
        address: {
            city: "Москва",
            street: "Белореченская улица",
            house: "31"
        }
    },
    products: [
        {
            articul: "RTLACB138001",
            name: "Носки из хлопка SUPIMA",
            brand: "UNIQLO",
            color: "Синий",
            season: "Мульти",
            price: 399,
            quantity: 3,
            cost: 0
        },
        {
            articul: "MP002XM0984Y",
            name: "Брюки",
            brand: "O'stin",
            color: "Черный",
            season: "Демисезон",
            price: 3799,
            quantity: 1,
            cost: 0
        },
        {
            articul: "MP002XM0984Y",
            name: "Дубленка CLAUDE",
            brand: "Mango Man",
            color: "Коричневый",
            season: "Мульти",
            price: 11190,
            quantity: 1,
            cost: 0
        }
    ]
};

// 2. Выводим JSON-представление в консоль
console.log("1. Исходный JSON:");
let jsonString = JSON.stringify(order, null, 2);
console.log(jsonString);

// 3. Преобразуем JSON-формат обратно в объект JS
let parsedOrder = JSON.parse(jsonString);

// Переменные для хранения сумм
let totalWithoutDiscount = 0;
let totalWithDiscount = 0;

// Функция для пересчета всех сумм
function calculateTotals() {
    totalWithoutDiscount = 0;
    
    // Пересчитываем стоимость каждой позиции
    parsedOrder.products.forEach(product => {
        product.cost = product.price * product.quantity;
        totalWithoutDiscount += product.cost;
    });

    // Считаем скидку
    let discountPercent = parseFloat(parsedOrder.order_info.discount) / 100; 
    totalWithDiscount = totalWithoutDiscount * (1 - discountPercent);
    
    // Записываем итог в объект
    parsedOrder.order_info.total_price = totalWithDiscount;
}

// 4. Отрисовка HTML на странице
function renderOrder() {
    calculateTotals(); // Обновляем цифры перед отрисовкой

    const appDiv = document.getElementById('app');
    
    let html = `
        <div class="wrapper">
            <div class="user_order_header">
                <h2>Заказ пользователя: ${parsedOrder.user.name} ${parsedOrder.user.surname}</h2>
            </div>
            
            <div class="user_data">
                <div class="user_personal_data">
                    <p>Номер телефона ${parsedOrder.user.phone}</p>
                    <p>E-mail ${parsedOrder.user.email}</p>
                </div>
                <div class="user_order_data">
                    <p>Дата заказа ${parsedOrder.order_info.order_date}</p>
                    <p>Тип доставки ${parsedOrder.order_info.delivery_type} (${parsedOrder.order_info.address.city}, ${parsedOrder.order_info.address.street}, ${parsedOrder.order_info.address.house})</p>
                    <p>Скидка ${parsedOrder.order_info.discount}</p>
                </div>
            </div>

            <div class="products">
    `;

    // Генерируем карточки товаров (используем index, так как артикулы повторяются)
    parsedOrder.products.forEach((product, index) => {
        html += `
            <div class="product_card">
                <div class="product_card_info">
                    <p>Артикул: ${product.articul}</p>
                    <p>Название: ${product.name}</p>
                    <p>Бренд: ${product.brand}</p>
                    <p>Цвет: ${product.color}</p>
                    <p>Сезон: ${product.season}</p>
                    <p>Цена: ${product.price} ₽</p>
                </div>
                <div class="product_card_quantity">
                    <div class="quantity_adjust" onclick="changeQuantity(${index}, -1)">-</div>
                    <span>${product.quantity}</span>
                    <div class="quantity_adjust" onclick="changeQuantity(${index}, 1)">+</div>
                </div>
                <div class="product_card_cost">
                    <span>${product.cost} ₽</span>
                </div>
            </div>
        `;
    });

    html += `
            </div>
            <div class="total_price">
                <p>Итого: ${totalWithoutDiscount} ₽</p>
                <p>Итого (со скидкой): <span class="total_price_number">${parsedOrder.order_info.total_price} ₽</span></p>
            </div>
        </div>
    `;

    appDiv.innerHTML = html;
}

// 5. Функция для обработки кликов по кнопкам + и -
window.changeQuantity = function(index, change) {
    let product = parsedOrder.products[index];
    
    // Проверяем, чтобы количество не ушло в минус или ноль
    if (product.quantity + change >= 1) {
        product.quantity += change;
        renderOrder(); // Перерисовываем страницу с новыми данными
    }
};

// Первый запуск отрисовки
renderOrder();

// Вывод финального объекта в консоль
console.log("2. Финальный объект с расчетами:");
console.log(parsedOrder);