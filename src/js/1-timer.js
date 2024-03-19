import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');
let intervalId;
let userSelectedDate;
startBtn.disabled = true;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        if (userSelectedDate < Date.now()){
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
                position: 'topRight',
            });
            startBtn.disabled = true;
            startBtn.classList.remove("is-active-btn");
        } else {
            startBtn.disabled = false;
            startBtn.classList.add("is-active-btn");
        }
    },
};

flatpickr("#datetime-picker", options);

startBtn.addEventListener("click", () => {
    intervalId = setInterval(() => {
        const intervalTime = userSelectedDate - Date.now();
        const time = convertMs(intervalTime);

        timerDays.textContent = addLeadingZero(time.days);
        timerHours.textContent = addLeadingZero(time.hours);
        timerMinutes.textContent = addLeadingZero(time.minutes);
        timerSeconds.textContent = addLeadingZero(time.seconds);

        if(intervalTime < 1000) clearInterval(intervalId);
    }, 1000);

    startBtn.disabled = true;
    startBtn.classList.remove("is-active-btn");
    inputDate.disabled = true;
});


function addLeadingZero(value) {
    if (value < 10) {
        return value.toString().padStart(2, '0');
    } else {
        return value.toString();
    }
}

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