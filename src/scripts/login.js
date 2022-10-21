import { login } from "./requests.js"
const btnLogin = document.querySelector('#btn-login')
const btnSpinner = document.querySelector('#btn-spinner')
const inputEmail = document.querySelector('#email')
const inputPassword = document.querySelector('#password')
const spanAlert = document.querySelector('#span-alert')

const eventLogin = () => {
    const form = document.querySelector("form")
    const elements = [...form.elements]
    btnLogin.setAttribute('disabled', true)
    elements.forEach(e => {
        e.onkeyup = () => {
            const filtered = elements.filter(e => e.tagName == "INPUT")
            const verify = filtered.every(e => e.value != '')
            // console.log(verify)
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
        console.log(response)
        if (response.indexOf("incorret")) {
            btnLogin.style.display = 'block';
            btnSpinner.style.display = 'none';
 
            btnLogin.setAttribute('disabled', true)
            btnLogin.classList.remove('btn-brand')
            btnLogin.classList.add('btn-disabled')
            
            spanAlert.classList.add('alert-span')
            spanAlert.textContent = response;

            if (response.indexOf("email")) inputEmail.classList.add('alert-form')
            else inputPassword.classList.add('alert-form')
        }
    })
}

eventLogin()