// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

// refs
const refs = {
  input: document.querySelector('input'),
  start: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let timerId = null;

Notify.init({
  width: '300px',
  position: 'center-top',
  closeButton: true,
  clickToClose: true,
});

// options for flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const deltaTimeForPlchdr = selectedDate - new Date();
    alertOnPastTime(deltaTimeForPlchdr);
    disableBtnStart(deltaTimeForPlchdr);
    enableBtnStart(deltaTimeForPlchdr);
    const timeLeftForPlchdr = convertMs(deltaTimeForPlchdr);
    render(timeLeftForPlchdr, deltaTimeForPlchdr);

    // Обработчик клика по кнопке старт
    const startButtonClick = () => {
      timerId = setInterval(updateTimer, 1000);
    };

    function updateTimer() {
      const timeNow = new Date();
      const deltaTime = selectedDate - timeNow;
      const timeLeft = convertMs(deltaTime);
      render(timeLeft, deltaTime);
    }
    // ==========EventListener==============
    refs.start.addEventListener('click', startButtonClick);
  },
};

flatpickr(refs.input, options);

// Функция которая отключает кнопку старт
const disableBtnStart = time => {
  if (time < 0) {
    refs.start.setAttribute('disabled', 'disabled');
  }
};

// Функция которая включает кнопку старт
const enableBtnStart = time => {
  if (time > 0) {
    refs.start.removeAttribute('disabled');
  }
};

// Создаю функцию, чтобы обрабатывать событие, когда пользователь выберет прошедшее время
const alertOnPastTime = time => {
  if (time < 0) {
    return Notify.warning('Please choose a date in the future');
  }
};

// Создаю функцию, чтобы добавлять 0 когда число состоит из одной цифры
function addLeadingZero(value) {
  return value.toString().length < 2
    ? value.toString().padStart(2, '0')
    : value;
}

// Функцию для концертирования миллисекунд во время
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

const render = ({ days, hours, minutes, seconds }, deltaTime) => {
  if (deltaTime > 0) {
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
  } else {
    refs.days.textContent = addLeadingZero(0);
    refs.hours.textContent = addLeadingZero(0);
    refs.minutes.textContent = addLeadingZero(0);
    refs.seconds.textContent = addLeadingZero(0);
  }
};
