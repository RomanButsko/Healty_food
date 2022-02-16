'use strict'
//Photo
const content = document.querySelectorAll(".tabcontent"),
        tabs = document.querySelectorAll(".tabheader__item"),
        tabsParent = document.querySelector(".tabheader__items"),
        menu = document.querySelectorAll(".menu__item");

function hideList () {
    content.forEach(item => {
        item.style.display = 'none';
});

    tabs.forEach(item => {
        item.classList.remove('tabheader__item_active');
    })
};

hideList();

function showContent (i = 0) {
    content[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active');
};

showContent();

tabsParent.addEventListener ('click', (event) => {
    const target = event.target;

    if(target && target.classList.contains("tabheader__item")) {
        tabs.forEach ((item, i) => {
            if(target == item) {
                hideList();
                showContent(i);
            }
        })
    }
} )

// Taimer

const holidays = '2022-03-12';

function differentTime (ended) {
    let now = new Date();
    const gap = Date.parse(holidays) - Date.parse(now),
        days = Math.floor(gap / (1000 * 60 * 60 * 24)),
        hours = Math.floor(gap / (1000 * 60 * 60) % 24),
        minutes = Math.floor((gap / 1000 / 60) % 60),
        seconds = Math.floor((gap / 1000) % 60);
    return {
        'gap': gap,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    }
}
function getZero (num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}


function recive (selector, ended) {
    const timer = document.querySelector(selector),
    days = timer.querySelector('#days'),
    hours = timer.querySelector('#hours'),
    minutes = timer.querySelector('#minutes'),
    seconds = timer.querySelector('#seconds'),
    timeInterval = setInterval(updateData , 1000);

    updateData();

function updateData () {
    const gap = differentTime(ended);

    days.innerHTML = getZero(gap.days);
    hours.innerHTML = getZero(gap.hours);
    minutes.innerHTML = getZero(gap.minutes);
    seconds.innerHTML = getZero(gap.seconds);

    if(gap.total <= 0) {
        clearInterval(timeInterval);
    }
    
}};
recive('.timer', holidays );


const closeModal = document.querySelector('[data-close]'),
        openModal = document.querySelectorAll('[data-call]'),
        modal = document.querySelector('.modal');

function open () {
    openModal.forEach(item => {
    item.addEventListener('click', () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'
    })});
    };
function close () { 
    modal.style.display = 'none';
    document.body.style.overflow = ''
};
function openFloor() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimer);
};

closeModal.addEventListener('click',close);
modal.addEventListener('click', (event) => {
        if(event.target === modal) {
        close();
    }});

document.addEventListener ('keydown', (event) => {
    if(event.code === "Escape") {
        close();
    }});
close();
open ();

const modalTimer = setInterval(openFloor, 5000);

function showModalByScroll() {
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openFloor();
        window.removeEventListener('scroll', showModalByScroll);
    }
}
    window.addEventListener('scroll', showModalByScroll);

    //Карточки

class Cards {
    constructor (src, alt, subtitle, descr, cost, total, parent, ...rest) {
        this.src = src;
        this.alt = alt;
        this.subtitle = subtitle;
        this.descr = descr;
        this.cost = cost;
        this.total = total;
        this.rest = rest;
        this.parent = document.querySelector(parent);
        this.transfer = 1500;
        this.multiply()
    }
    multiply() {
        this.total = this.total * this.transfer
    }
    editHtm () {
        const element = document.createElement('div');
        if (this.rest.length === 0 ) {
            this.rest = "menu__item"
            element.classList.add(this.rest)
        } else {
            this.rest.forEach (numbert => element.classList.add(numbert))
        }
        element.innerHTML = `
        <img src= ${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.subtitle}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">${this.cost}:</div>
            <div class="menu__item-total"><span>${this.total}</span> грн/день </div>
        </div>;`
        this.parent.append(element)
    }
} 


new Cards( 
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        'Цена:',
        229,
        ".menu .container"
    ).editHtm();

new Cards( 
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум"',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    'Цена:',
    550,
    ".menu .container"
).editHtm();

new Cards( 
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    'Цена:',
    430,
    ".menu .container"
).editHtm();


// Форма, проверить send json, выдает ошибку


const forms = document.querySelector('form')

const obj = {
    approve: 'Данные загружены',
    inprogress: "Идет загрузка",
    faild: "Данные не прошли проверку"
}
forms.forEach (item => {
    sendDate(item)
});

function sendDate(form) {
    form.addEventListener('submit', (e) => {
    e.preventDefault();

    const statusMessage = document.createElement('div');
    statusMessage.classList.add('status');
    statusMessage.textContent = obj.inprogress;
    form.append(statusMessage)

    const formData = new FormData(form);

    const object = {};
    formData.forEach(function(value,key) {
        object[key] = value;
})

    fetch('server.php', {
        metod: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(object)
    }).then (data => {
        console.log(data)
        statusMessage.textContent = obj.approve;
    }).catch (() => {
        statusMessage.textContent = obj.faild;
    })
})};

//