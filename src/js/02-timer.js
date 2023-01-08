import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const startBtn = document.querySelector("button[data-start]");
const dataDays = document.querySelector("span[data-days]");
const dataHours = document.querySelector("span[data-hours]");
const dataMinutes = document.querySelector("span[data-minutes]");
const dataSeconds = document.querySelector("span[data-seconds]");
let saveSelectDate = "";

startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      const dateNow = new Date ();
      if (selectedDates[0] < dateNow){
        window.alert("Please choose a date in the future");
      } else {
        startBtn.disabled = false;
        saveSelectDate = selectedDates[0];
      }
    },
};

flatpickr("input#datetime-picker", options);

startBtn.addEventListener('click', () => {
  const intervalId = setInterval(()=>{
    const dateNow = new Date ();
    const ms = saveSelectDate - dateNow;
    if (ms >= 0 ){
      const result = convertMs(ms);
      dataDays.textContent = addLeadingZero(result.days);
      dataHours.textContent = addLeadingZero(result.hours);
      dataMinutes.textContent = addLeadingZero(result.minutes);
      dataSeconds.textContent = addLeadingZero(result.seconds);
    }
  }, 1000)
  // if (ms < 0){
  //   clearInterval(intervalId);
  // }
})


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}