let i = Math.floor(Math.random() * 100);
let answerInp = document.querySelector('.input'),
    answerBtn = document.querySelector('.insertBtn'),
    answer = document.querySelectorAll('.answer');
console.log(i);

function startWork() {
    answer.forEach(item => {
        item.classList.remove('active');
    });
    if (answerInp.value > i) {

        answer[0].classList.add('active');
    } else if(answerInp.value < i) {

        answer[1].classList.add('active');
    } else {
        answer[2].classList.add('active');
    }
}


answerBtn.addEventListener('click', () => {
    startWork();
    answerInp.value = '';
    
});
document.addEventListener('keydown', (e) => {
    if(e.code === "Enter") {
        startWork();
        answerInp.value = '';
    }
    
});
    /* while (answer.value != i) {
        if (answer.value > i) {
            console.log('Много');
        } else if(answer.value < i) {
            console.log('Мало!');
           
        }
    } console.log('win'); */




/* let i = Math.floor(Math.random() * 100);
let answer = +prompt('Введите число от 1 до 100');
console.log(i);


for (; answer != i; )   {

    if (answer > i) {
        console.log('Много');
        answer = +prompt('Введите число от 1 до 100');
    } else if(answer < i) {
        console.log('Мало!');
        answer = +prompt('Введите число от 1 до 100');
    }
        
}        
console.log('WIN'); */



// рабочий код
/* do {
    if (answer > i) {
        console.log('Много');
        answer = +prompt('Введите число от 1 до 100');
    } else if(answer < i) {
        console.log('Мало!');
        answer = +prompt('Введите число от 1 до 100');
    } 
} while (answer != i);
console.log('WIN'); */