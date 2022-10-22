import { login } from "./requests.js"
const btnLogin = document.querySelector('#btn-login')
const btnSpinner = document.querySelector('#btn-spinner')
const inputEmail = document.querySelector('#email')
const inputPassword = document.querySelector('#password')
const spanAlert = document.querySelector('#span-alert')


/* ----------------- EVENTO DE LOGIN ------------------ */
const eventLogin = () => {
    const form = document.querySelector("form")
    const elements = [...form.elements]
    btnLogin.setAttribute('disabled', true)
    elements.forEach(e => {
        e.onkeyup = () => {
            const filtered = elements.filter(e => e.tagName == "INPUT")
            const verify = filtered.every(e => e.value != '')
            inputPassword.classList.remove('alert-form')
            inputEmail.classList.remove('alert-form')

            if (verify) {
                btnLogin.removeAttribute('disabled')
                btnLogin.classList.remove('btn-disabled')
                btnLogin.classList.add('btn-brand')
            } else {
                btnLogin.setAttribute('disabled', true)
                btnLogin.classList.remove('btn-brand')
                btnLogin.classList.add('btn-disabled')
            }
            spanAlert.classList.remove('alert-span')
        }
    })

    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        btnLogin.style.display = 'none';
        btnSpinner.style.display = 'flex';
        const body = {}

        elements.forEach(elem => {
            if (elem.tagName == "INPUT" && elem.value != '') {
                body[elem.id] = elem.value
            }
        })

        const response = await login(body)

        if (response.indexOf("incorret") != -1) {
            btnLogin.style.display = 'block';
            btnSpinner.style.display = 'none';

            btnLogin.setAttribute('disabled', true)
            btnLogin.classList.remove('btn-brand')
            btnLogin.classList.add('btn-disabled')

            spanAlert.classList.add('alert-span')
            spanAlert.textContent = response;

            if (response.indexOf("senha") != -1) inputPassword.classList.add('alert-form')
            else inputEmail.classList.add('alert-form')
        }
    })
}
eventLogin()