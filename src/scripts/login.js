import { login } from "./requests.js"
const btnLogin = document.querySelector('#btn-login')



const eventLogin = () => {
    const form = document.querySelector("form")
    const elements = [...form.elements]

   /*  elements.forEach(elem => {
        if (elem.tagName == "INPUT") {
            console.log(elem)
            elem.onkeyup = () => {
                if (elem.value == '') {
                    btnLogin.setAttribute('disabled', true)
                    console.log('true')
                } else {
                    btnLogin.setAttribute('disabled', false)
                    console.log('false')
                }
            }
        }
        // console.log(elem)
    }) */

    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        const body = {}

        elements.forEach(elem => {
            // console.log(elem.tagName)
            if (elem.tagName == "INPUT" && elem.value != '') {
                body[elem.id] = elem.value
            }
        })
        // console.log(body)
        await login(body)
    })
}

eventLogin()