import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  firstDelayEl: document.querySelector('input[name="delay"]'),
  delayStepEl: document.querySelector('input[name="step"]'),
  amountEl: document.querySelector('input[name="amount"]'),
  formEl: document.querySelector('.form'),
};

refs.formEl.addEventListener('submit', onCreatePromisesClick);

function onCreatePromisesClick(event) {
  event.preventDefault();

  const delay = Number.parseInt(refs.firstDelayEl.value, 10);
  const step = Number.parseInt(refs.delayStepEl.value, 10);
  const amount = Number.parseInt(refs.amountEl.value, 10);

  createPromises(amount, delay, step);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function createPromises(amount, initialDelay, step) {
  for (let i = 1; i <= amount; i++) {
    const delay = initialDelay + (i - 1) * step;
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
