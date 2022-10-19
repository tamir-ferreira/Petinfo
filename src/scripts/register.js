import { register } from "./requests.js"


const eventRegister = () => {
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
        console.log(body)
        await register(body)
    })
}

eventRegister()