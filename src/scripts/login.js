import { login } from "./requests.js"
const btnLogin = document.querySelector('#btn-login')
const btnSpinner = document.querySelector('#btn-spinner')
const inputPassword = document.querySelector('#password')
const spanPassword = document.querySelector('#span-alert')

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
        }
    })

    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        btnLogin.style.display = 'none';
        btnSpinner.style.display = 'flex';
        const body = {}

        elements.forEach(elem => {
            // console.log(elem.tagName)
            if (elem.tagName == "INPUT" && elem.value != '') {
                body[elem.id] = elem.value
            }
        })
        // console.log(body)
        if (await login(body) == false) {
            console.log('senha incorreta')
            btnLogin.style.display = 'block';
            btnSpinner.style.display = 'none';
            btnLogin.setAttribute('disabled', true)
            btnLogin.classList.remove('btn-brand')
            btnLogin.classList.add('btn-disabled')

            inputPassword.classList.add('alert-form')
            spanPassword.classList.add('alert-span')
            
        }

        /* elements.forEach(elem => {
            // console.log(elem.tagName)
            if (elem.tagName == "INPUT" && elem.value != '') {
                elem.value = ''
            }
        }) */

    })
}

eventLogin()