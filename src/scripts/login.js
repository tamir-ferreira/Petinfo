import { login } from "./requests.js"

const eventlogin = () => {
    const form = document.querySelector("form")
    const elements = [...form.elements]

    form.addEventListener("submit", async (e) =>{
        e.preventDefault()

        const body = {}

        elements.forEach(elem => {
            if (elem.tagName == "input" && elem.value != '') {
                body[elem.id] = elem.value
            }

        })
        
        await login(body)
    })
}