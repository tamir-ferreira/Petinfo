import { setLocalStorage } from "./localStorage.js";

const baseUrl = "http://localhost:3333/"

export async function login(body) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };

    try {
        const request = await fetch(baseUrl + "login", options)
        if (request.ok) {
            const response = await request.json()

            setLocalStorage('user-token', response.token)
            getUser(response.token)
            // console.log(response.token)
            window.location.replace("./src/pages/home.html")
        } else {
            console.log("erro de login")
            return false
        }

    } catch (error) {
        console.error(error)
        return false
    }
}

async function getUser(token) {
    const options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token
        }
    };
    console.log(options)
    try {
        const request = await fetch(baseUrl + 'users/profile', options)
        if (request.ok) {
            const response = await request.json()
            // console.log(response)
            setLocalStorage('user-profile', response)
        } else {
            console.log("erro ao receber o cadastro do usuário")
        }

    } catch (error) {
        console.log(error)
    }

}

export async function register(body) {
    const toast = document.querySelector('.tooltips')
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };

    try {
        const request = await fetch(baseUrl + "users/create", options)
        if (request.ok) {
            const response = await request.json()
            toast.classList.add('show-toast')
            setTimeout(() => {
                window.location.replace("../../index.html")
            }, 5000)
            // console.log(request)
        } else {
            console.log("erro de cadastro")
        }

    } catch (error) {
        console.error(error)
    }
}

/* https://img2.gratispng.com/20180327/ssq/kisspng-computer-icons-user-profile-avatar-profile-5ab9e3b05772c0.6947928615221318883582.jpg */