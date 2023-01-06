const form = document.querySelector(".form");

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();

  const {delay, step, amount} = evt.currentTarget.elements;

  setTimeout(() => {
    let position = 1;

    createPromise(position, delay.value)
      .then(({ position, delay }) => {
        console.log(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.error(`Rejected promise ${position} in ${delay}ms`);
      });

    if (Number(amount.value) === 1) {
      return;
    }

    const intervalId = setInterval(() => {
      position += 1;

      createPromise(position, delay.value)
        .then(({ position, delay }) => {
          console.log(`Fulfilled promise ${position} in ${Number(delay) + Number(step.value) * (position - 1)}ms`);
        })
        .catch(({ position, delay }) => {
          console.error(`Rejected promise ${position} in ${Number(delay) + Number(step.value) * (position - 1)}ms`);
        })
        .finally(() => {
          if (position === Number(amount.value)) {
            clearInterval(intervalId);
          }
        });
    }, step.value);
  }, delay.value);
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({position, delay});
    } else {
      reject({position, delay});
    }
  })
  return promise;
}
