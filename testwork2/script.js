window.addEventListener('DOMContentLoaded', () => {
    const   tabs = document.querySelectorAll('.tabheader__item'),
            tabsContent = document.querySelectorAll('.tabcontent'),
            tabsParent = document.querySelector('.tabheader__items');


    function hideTabsContent() {
        tabsContent.forEach((item) => {
            item.style.display = 'none';
        });
        tabs.forEach((item) => {
            item.classList.remove('tabheader__item_active');
        });
    }
    
    function showTabsContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }
    hideTabsContent();
    showTabsContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            });
        }
    });

    /* Урок 41. Создаем таймер обратного отсчета на сайте */
    let deadLine = '2021-10-30';

    function getTimeRemaining(endTime) {
        const   t = Date.parse(endTime) - Date.parse(new Date()),
                days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor(( t / (1000 * 60 * 60)) % 24),
                minutes = Math.floor(t / (1000 * 60) % 60),
                seconds = Math.floor(t / (1000) % 60);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    getTimeRemaining();
    function getZero(num) {
        if (num < 10 && num >= 0) {
            return `0${num}`;
        } else {
            return num;
        }
    }


    function setClock(selector, endTime) {
        const   timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);
        updateClock();
        function updateClock () {
            const t = getTimeRemaining(endTime);
            days.textContent = getZero(t.days);
            hours.textContent = getZero(t.hours);
            minutes.textContent = getZero(t.minutes);
            seconds.textContent = getZero(t.seconds);
            
            if(t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
        
    }
    setClock('.timer', deadLine);

    // modal window//

    /* Первый способ, самостоятельный */
    /* const   modalBtn = document.querySelectorAll('[data-modal]'),
            modalWindow = document.querySelector('.modal'),
            modalClose = document.querySelector('.modal__close');

    modalBtn.forEach((item) => {
        item.addEventListener('click', () => {
            modalWindow.style.display = 'block';
            //убираем скрол страницы под модальным окном.//
            document.body.style.overflow = 'hidden';
            
        });
    });
    modalClose.addEventListener('click', () => {
        modalWindow.style.display = 'none';
        //подключаем скрол после выхода из модального окна//
        document.body.style.overflow = '';
    }); */

    const   modalTrigger = document.querySelectorAll('[data-modal]'),
            modal = document.querySelector('.modal'),
            modalCloseBtn = document.querySelector('[data-close]');
            
    modalTrigger.forEach((item) => {
        item.addEventListener('click',openModal);
    });
    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }
    function modalCloseFunc() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
        /* clearInterval(modalTimerId); */
    }
    modalCloseBtn.addEventListener('click', () => {
        modalCloseFunc();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modalCloseFunc();
        } else {
            
        }
    });
/* закрытие модального окна с помощью клавиши "Escape" */
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            modalCloseFunc();
        }
    });

    // modification modal window //

    /* const modalTimerId = setTimeout(openModal, 2000); */

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // Урок 48. Используем классы в реальной работе //

    class MenuCard {
        constructor(src, alt, subtitle, decr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.subtitle = subtitle;
            this.decr = decr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }
        changeToUAH() {
            this.price = this.price * this.transfer;
        }
        render(){
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            }
            this.classes.forEach(className => element.classList.add(className));
            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                    <div class="menu__item-descr">${this.decr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
            this.parent.append(element);
        }
    }
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        229,
        '.menu .container',
        /* 'menu__item',
        'big' */
    ).render();
    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        550,
        '.menu .container',
        'menu__item'
    ).render();
    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню “Постное”"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        430,
        '.menu .container',
        'menu__item'
    ).render();
});