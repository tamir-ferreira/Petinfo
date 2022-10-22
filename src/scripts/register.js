import { register } from "./requests.js"
const btnRegister = document.getElementById('btn-register')
const btnSpinner = document.getElementById('btn-spinner')


const eventRegister = () => {
    const form = document.querySelector("form")
    const elements = [...form.elements]
    btnRegister.setAttribute('disabled', true)
    elements.forEach(e => {
        e.onkeyup = () => {
            const filtered = elements.filter(e => e.tagName == "INPUT")
            const verify = filtered.every(e => e.value != '')

            if (verify) {
                btnRegister.removeAttribute('disabled')
                btnRegister.classList.remove('btn-disabled')
                btnRegister.classList.add('btn-brand')
            } else {
                btnRegister.setAttribute('disabled', true)
                btnRegister.classList.remove('btn-brand')
                btnRegister.classList.add('btn-disabled')
            }
        }
    })

    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        btnRegister.style.display = 'none';
        btnSpinner.style.display = 'flex';
        const body = {}

        elements.forEach(elem => {
            if (elem.tagName == "INPUT" && elem.value != '') {
                body[elem.id] = elem.value
            }
        })

        if (await register(body)) {
            const toast = document.querySelector('.tooltips')
            toast.classList.add('show-toast')
            setTimeout(() => {
                window.location.replace("../../index.html")
            }, 5000)
        }

        elements.forEach(elem => {
            if (elem.tagName == "INPUT" && elem.value != '') {
                elem.value = ''
            }
        })
        btnRegister.style.display = 'block';
        btnSpinner.style.display = 'none';
        btnRegister.setAttribute('disabled', true)
        btnRegister.classList.remove('btn-brand')
        btnRegister.classList.add('btn-disabled')
    })
}

eventRegister()