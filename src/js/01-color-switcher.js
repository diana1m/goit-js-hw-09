// Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону <body> 
// на випадкове значення, використовуючи інлайн стиль. Натисканням на кнопку «Stop» зміна кольору 
// фону повинна зупинятися.

// УВАГА
// Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів. Зроби так, 
// щоб доки зміна теми запущена, кнопка «Start» була неактивною (disabled)..

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");
let timerId = null;

stopBtn.disabled = true; 
console.log("djfjjfjsd");

startBtn.addEventListener("click", () => {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
        // startBtn.disabled = true;
        
    }, 1000);
});

stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
});
