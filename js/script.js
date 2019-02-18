// Работа с фронтендом:
// 1) Получаем элементы
// 2) Прописываем функции
// 3) Настраиваем интерактив, навешиваем функции

window.addEventListener('DOMContentLoaded', () => { //Когда загрузилась именно вёрстка

// Через "," перечисляем переменные
const cartWrapper = document.querySelector('.cart__wrapper'), //querySelectorAll - находит ВСЕ элементы с таким классом, document.querySelector - только первый (применяем, если такой элемент один)
    cart = document.querySelector('.cart'),
    close = document.querySelector('.cart__close'),
    open = document.querySelector('#cart'),
    goodsBtn = document.querySelectorAll('.goods__btn'),
    products = document.querySelectorAll('.goods__item'),
    confirm = document.querySelector('.confirm'),
    badge = document.querySelector('.nav__badge'), //значок, куда вписываем количество товаров в корзине
    totalCost = document.querySelector('.cart__total > span'), //найдёт только один span (document.querySelector)
    titles = document.querySelectorAll('.goods__title');

// РЕАЛИЗАЦИЯ МОДАЛЬНОГО ОКНА
function openCart() {
    cart.style.display = 'block';
    document.body.style.overflow = 'hidden'; //отключаем прокрутку страницы при открытом модальном окне
} // после объявления функции ";" не нужна
//Затемнение фона происходит из-за background-color у открывшегося модального окна (см. вёрстку)

function closeCart() {
    cart.style.display = 'none';
    document.body.style.overflow = ''; // возвращается в начальную позицию
}

open.addEventListener('click', openCart); // без ()
close.addEventListener('click', closeCart);


//Добавляем карточку продукта в корзину
goodsBtn.forEach(function(btn, i){ // Проходимся по всем кнопкам (btn[i]), выполняя функцию
    btn.addEventListener('click', () => {
        let item = products[i].cloneNode(true), // Клонируем ВСЁ, что внутри карточки
            trigger = item.querySelector('button'),
            removeBtn = document.createElement('div'),
            empty = cartWrapper.querySelector('.empty'); //запятые ставим, т.к. одним разом все переменные создавали

        trigger.remove(); // Удалили кнопку "добавить в корзину"

        removeBtn.classList.add('goods__item-remove');  // Не используем className, изучаем методы classList
        removeBtn.innerHTML = '&times';
        item.appendChild(removeBtn);

        cartWrapper.appendChild(item);
        if (empty) { //если переменная empty существует, возвращается true
            empty.remove();
        }
    });
});

});


//Промокод для покупки курса (-25%, 48ч после интенсива): JS-PF
//ДЗ:
//Закомитить и запушить на Github рабочий код (а он рабочий)
//Ссылку на репозиторий отправить в группе в ВК под нужным постом