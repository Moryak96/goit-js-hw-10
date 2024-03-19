import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", createPromise);

function createPromise(event) {
    event.preventDefault();

    const delay = form.elements.delay.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (form.elements.state.value === "fulfilled") {
            resolve(delay);
          } else {
            reject(delay);
          }
        }, delay);
    });

    promise
    .then(() => {
        iziToast.success({
            title: 'Success',
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: 'topRight',
        });
    })
    .catch(() => {
        iziToast.error({
            title: 'Error',
            message: `❌ Rejected promise in ${delay}ms`,
            position: 'topRight',
        });
    })

}



