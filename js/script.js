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

            showConfirm();
            // calcGoods(1); //ОШИБКА ПРЕПОДА, КОТОРУЮ ОН ОБЪЯСНИЛ ТЕМ. ЧТО length ВОЗВРАЩАЕТ ЧИСЛО, МЕНЬШЕЕ НА 1, ЧЕМ КОЛИЧЕСТВО ЭЛЕМЕНТОВ. НАДО ДОБАВИТЬ ЭТО ПОСЛЕ cartWrapper.appendChild(item);

            removeBtn.classList.add('goods__item-remove');  // Не используем className, изучаем методы classList
            removeBtn.innerHTML = '&times';
            item.appendChild(removeBtn);

            cartWrapper.appendChild(item);
            if (empty) { //если переменная empty существует, возвращается true
                empty.remove();
            }
            calcGoods(0);
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

    function calcGoods(i) { // При удалении товаров из корзины будем вызывать функцию с 0
        const items = cartWrapper.querySelectorAll('.goods__item');
        badge.textContent = i + items.length;
        //Astalavista в ответ на замечание про length​: Да, но вызывается функция, раньше чем элемент добавляется в массив, соответственно автор заранее плюсует единицу.
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
                calcGoods(0);
                calcTotal();
            });
        });
    }
    

});


//Промокод для покупки курса (-25%, 48ч после интенсива): JS-PF
//ДЗ 1:
//Закомитить и запушить на Github рабочий код (а он рабочий)
//Ссылку на репозиторий отправить в группе в ВК под нужным постом

//ДЗ 2:
//Вернуть сообщение "Ваша корзина пуста", когда нет товаров (можно "empty" не удалять, а скрывать)
//(глянуть про hoisting и типы переменных: var, let, const)