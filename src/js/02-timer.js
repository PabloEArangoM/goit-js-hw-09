import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startButton = document.querySelector('[data-start]');
const datetimePicker = document.getElementById('datetime-picker');
const timerFields = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]')
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = new Date(selectedDates[0]);
    if (selectedDate <= new Date()) {
      window.alert("Please choose a date in the future");
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);

let countdownInterval;

startButton.addEventListener('click', () => {
  const selectedDate = new Date(datetimePicker.value);
  const currentTime = new Date().getTime();
  let timeRemaining = selectedDate - currentTime;

  if (timeRemaining <= 0) {
    window.alert("Please choose a date in the future");
    return;
  }

  startButton.disabled = true;

  function updateTimer() {
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    timerFields.days.textContent = days;
    timerFields.hours.textContent = hours;
    timerFields.minutes.textContent = minutes;
    timerFields.seconds.textContent = seconds;

    timeRemaining -= 1000;

    if (timeRemaining < 0) {
      clearInterval(countdownInterval);
      startButton.disabled = false;
      notifyUser("Countdown completed!");
    }
  }

  updateTimer();

  countdownInterval = setInterval(updateTimer, 1000);
});

function notifyUser(message) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(message);
  } else if ('Notification' in window && Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification(message);
      }
    });
  }
}
