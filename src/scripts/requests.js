import { setLocalStorage } from "./localStorage.js";

const baseUrl = "http://localhost:3333/"

/* ------------------ REQUISIÇÃO DE LOGIN DO USUÁRIO ----------------- */
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
            await getUser(response.token)

            window.location.replace("./src/pages/home.html")
        } else {
            const error = await request.json()

            return error.message
        }

    } catch (error) {
        console.error(error)
        return false
    }
}


/* ------------------ REQUISIÇÃO DOS DADOS DO USUÁRIO LOGADO ----------------- */
async function getUser(token) {
    const options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token
        }
    };

    try {
        const request = await fetch(baseUrl + 'users/profile', options)
        if (request.ok) {
            const response = await request.json()

            setLocalStorage('user-profile', response)
        } else {
            console.log("erro ao receber o cadastro do usuário")
        }

    } catch (error) {
        console.log(error)
    }
}


/* ------------------ REQUISIÇÃO DAS POSTAGENS CADASTRADAS ----------------- */
export async function getPosts(token) {
    const options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token
        }
    };

    try {
        const request = await fetch(baseUrl + 'posts', options)

        if (request.ok) {
            const response = await request.json()

            return response
        } else {
            console.log("erro ao receber os posts cadastrados")
        }

    } catch (error) {
        console.log(error)
    }
}


/* ------------------ REQUISIÇÃO DE CADASTRO DE NOVO USUÁRIO ----------------- */
export async function register(body) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };

    try {
        const request = await fetch(baseUrl + "users/create", options)
        const response = await request.json()
        if (request.ok) {

            return true
        } else {
            console.log(response.message)
            return false
        }

    } catch (error) {
        console.error(error)
    }
}


/* ------------------ REQUISIÇÃO DE CADASTRO DE NOVA POSTAGEM ----------------- */
export async function newPost(body, token) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(body)
    };

    try {
        const request = await fetch(baseUrl + "posts/create", options)
        if (request.ok) {
            const response = await request.json()

            return true
        } else {
            const error = await request.json()
            console.log(error.message)

            return false
        }

    } catch (error) {
        console.error(error)
        return false
    }
}


/* ------------------ REQUISIÇÃO DE ALTERAÇÃO DE DADOS DE POSTAGENS ----------------- */
export async function updatePost(body, token, id) {
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(body)
    };
    console.log(body)

    try {
        const request = await fetch(baseUrl + "posts/" + id, options)
        if (request.ok) {
            const response = await request.json()

            return true
        } else {
            const error = await request.json()
            console.log(error.message)

            return false
        }

    } catch (error) {
        console.error(error)
        return false
    }
}

/* ----------------- REQUISIÇÃO PARA DELETAR POSTAGEM -------------- */
export async function deletePost(token, id) {
    const option = {
        method: "DELETE",
        headers: {
            'Content-Type': 'Application/json',
            Authorization: 'Bearer ' + token
        }
    }

    try {
        const request = await fetch(baseUrl + "posts/" + id, option)
        const response = await request.json()
        if (request.ok) {

            return true
        } else {
            console.erroe(response.message)
            return false
        }

    } catch (error) {
        console.error(error)
    }
}


/* ------------------ REQUISIÇÃO DE ALTERAÇÃO DE DADOS DO USUÁRIO ----------------- */
export async function updateUser(token) {
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        body: '{"avatar":"../images/profile-default.jpg"}'

    };

    try {
        const request = await fetch(baseUrl + "users/profile", options)
        if (request.ok) {
            const response = await request.json()

            return response
        } else {
            const error = await request.json()
            console.log(error.message)
            return error.message
        }

    } catch (error) {
        console.error(error)
        return false
    }
}