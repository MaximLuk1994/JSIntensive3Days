// Работа с фронтендом:
// 1) Получаем элементы
// 2) Прописываем функции
// 3) Настраиваем интерактив, навешиваем функции

window.addEventListener('DOMContentLoaded', () => { //Когда загрузилась именно вёрстка

    const loadContent = async (url, callback) => {
        await fetch(url)
            .then(response => response.json())
            .then(json => createElement(json.goods)) //Чтобы обратиться именно к goods в json-е. Чтобы функция была универсальной, надо бы по-другому
            .then(console.log('База загружена'));// Для себя, для проверки

        callback();
    }

    function createElement(arr) {
        const goodsWrapper = document.querySelector('.goods__wrapper');
        arr.forEach(function(item) {
            let card = document.createElement('div');
            card.classList.add('goods__item');
            card.innerHTML = `
                <img class="goods__img" src="${item.url}" alt="phone">
                <div class="goods__colors">Доступно цветов: 4</div>
                <div class="goods__title">
                    ${item.title}
                </div>
                <div class="goods__price">
                    <span>${item.price}</span> руб/шт
                </div>
                <button class="goods__btn">Добавить в корзину</button>
            `;
            goodsWrapper.appendChild(card);
        });
    }

    loadContent('js/db.json', () =>{
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

                showConfirm();
                // calcGoods(1); //ОШИБКА ПРЕПОДА, должно стоять ПОСЛЕ добавления элемента в вёрстку

                removeBtn.classList.add('goods__item-remove');  // Не используем className, изучаем методы classList
                removeBtn.innerHTML = '&times';
                item.appendChild(removeBtn);

                cartWrapper.appendChild(item);
                if (empty) { //если переменная empty существует, возвращается true
                    empty.style.display = 'none';
                }
                calcGoods();
                calcTotal();
                removeFromCart();// Вызываем функцию, которая привязывает функцию при клике на крестики
            });
        });

        function sliceTitle() {
            titles.forEach(function(item) {
                if (item.textContent.length < 70) {
                    return;
                } 
                else {
                    const str = item.textContent.slice(0, 71) + '...';
                    // const str = `${item.textContent.slice(0, 70)} ...`;
                    item.textContent = str;
                }
            });
        }
        sliceTitle();

        // Лучше использовать анимации CSS
        function showConfirm() {
            confirm.style.display = 'block';
            let counter = 100;
            const id = setInterval(frame, 10);

            function frame() {
                if (counter == 10) {
                    clearInterval(id);
                    confirm.style.display = 'none';
                }
                else {
                    counter--;
                    confirm.style.transform = `translateY(-${counter}px)`; // Сдвигается вверх
                    confirm.style.opacity = '.' + counter;
                }            
            }
        }

        function calcGoods() { 
            const items = cartWrapper.querySelectorAll('.goods__item');
            badge.textContent = items.length;
            //Astalavista в ответ на замечание про length​ и ошибку препода: Да, но вызывается функция, раньше чем элемент добавляется в массив, соответственно автор заранее плюсует единицу. 
        }

        function calcTotal() {
            const prices = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span');
            let total = 0;
            prices.forEach(function(item) {
                total += +item.textContent;
            });
            totalCost.textContent = total;
        }

        function removeFromCart() {
            const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');
            removeBtn.forEach(function(btn) {
                btn.addEventListener('click', () => {// Будем удалять родителя элемента с указанным классом
                    btn.parentElement.remove();
                    calcGoods();
                    calcTotal();

                    const items = cartWrapper.querySelectorAll('.goods__item');
                    let empty = cartWrapper.querySelector('.empty');
                    if(items.length < 1) empty.style.display = 'block';
                });
            });
        }
    });
});
//Промокод для покупки курса (-25%, 48ч после интенсива): JS-PF
//ДЗ 1: ГОТОВО
//Закомитить и запушить на Github рабочий код (а он рабочий)
//Ссылку на репозиторий отправить в группе в ВК под нужным постом

//ДЗ 2: ГОТОВО
//Вернуть сообщение "Ваша корзина пуста", когда нет товаров (можно "empty" не удалять, а скрывать)
//(глянуть про hoisting и типы переменных: var, let, const)

//Глянуть jsonplaceholder, fetch (пример работы с json - стрим 3-го дня)

// const example = {username: "Maxim"};

// fetch('https://jsonplaceholder.typicode.com/todos/1')
//   .then(response => response.json())
//   .then(json => console.log(json))
//fetch - асинхронная функция. А нам надо, чтобы весь код, привязывающий функции к элементам, работал ПОСЛЕ его выполнения
//В ES7 появилось хорошее решение: assinc await - только после выполнения того, рядом с чем стоит await, выполнится последующий код. Пример сверху
