import {register} from "./requests.js"

const baseUrl = "http://localhost:3333/"

async function login(body) {
    try {
        const request = await fetch(baseUrl + "login", {
            method: "POST",
            heders: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        if (request.ok) {
            toast("sucesso", "cadastro feito")

            setTimeout(() => {
                window.location.replace("../index.html")
            }, 4000)

        } else {
            console.log("erro de login")

        }
    } catch (error) {
        console.log("erro de login")
    }

}