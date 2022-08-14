function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let timerId = null;

const refs = {
  body: document.querySelector('body'),
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
};

const startButtonClick = () => {
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.start.setAttribute('disabled', 'disabled');
};

const stoptButtonClick = () => {
  clearInterval(timerId);
  refs.body.style.backgroundColor = 'transparent';
  refs.start.removeAttribute('disabled');
};

refs.start.addEventListener('click', startButtonClick);
refs.stop.addEventListener('click', stoptButtonClick);
