import { login } from "./requests.js"


const eventLogin = () => {
    const form = document.querySelector("form")
    const elements = [...form.elements]

    form.addEventListener("submit", async (event) =>{
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