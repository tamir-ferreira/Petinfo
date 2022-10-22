import { clearLocalStorage, getLocalStorage, getUserStorage, setLocalStorage } from "./localStorage.js"
import { renderModalCreate, renderModalDelete, renderModalEdit, renderModalRead } from "./modal.js"
import { deletePost, getPosts, newPost, updatePost, updateUser } from "./requests.js"


/* --------------- VERIFICA SE O USUÁRIO ESTÁ LOGADO -------------- */
const verifyPermission = () => {
    const token = getLocalStorage('user-token')
    if (token == '' || token == null) {
        window.location.replace('../../index.html')
    } else {
        renderProfile(token)
    }
}
verifyPermission()


/* --------------- RENDERIZAR PROFILE DO USUÁRIO CONECTADO -------------- */
async function renderProfile(token) {
    let user = getUserStorage();
    const userProfile = document.querySelector('.user-profile')
    userProfile.innerHTML = ''
    const { username, avatar } = user
    userProfile.insertAdjacentHTML('afterbegin',
        `<img id='avatar' src="${avatar}" alt="foto de perfil">
         <div class="container-login hidden-profile">
            <span class="font4-500">${username}</span>
            <div>
                <img src="../images/sign-out.svg" alt="">
                <span id='logout' class="font4-500">Sair da Conta</span>
            </div>
         </div>
        `
    )

    document.getElementById('avatar').onerror = async() =>{
        user = await updateUser(token)
        setLocalStorage('user-profile', user)
        await renderProfile(token)
    }

    mapBtnsProfile()
    await renderPosts(token, user.id)
}


/* --------------- MAPEAR BOTÕES DO PROFILE -------------- */
function mapBtnsProfile() {
    const btnCreatePost = document.getElementById('btn-create-post')
    const profile = document.querySelector("[alt='foto de perfil']")
    const containerLogin = document.querySelector('.container-login')
    const logout = document.getElementById('logout')
    btnCreatePost.onclick = () => renderModalCreate()

    profile.onmouseenter = () => containerLogin.classList.toggle('hidden-profile')

    logout.onclick = () => {
        clearLocalStorage();
        window.location.replace("../../index.html");
    }
}


/* --------------- RENDERIZAR POSTS CADASTRADOS -------------- */
async function renderPosts(token, userId) {
    const listFeed = document.querySelector('.list-feed')
    const posts = await getPosts(token)
    let count = 0
    listFeed.innerHTML = ''

    posts.forEach(post => {
        const formatedDate = formatDate(post.createdAt)
        let content = post.content
        if (post.content.length > 145) content = post.content.substr(0, 145) + ' ...'

        let btnsPost = ''
        if (post.user.id == userId) {
            btnsPost = `<div>
                            <button data-edit-modal=${count} class="btn-clean-small">Editar</button>
                            <button data-remove-modal=${count} class="btn-gray-small">Excluir</button>
                         </div>`
        }

        listFeed.insertAdjacentHTML('afterbegin',
            `<li class="post" id="${post.id}">
                <article>
                    <header>
                        <div class="font5-500">
                            <img src="${post.user.avatar}" alt="foto de perfil">
                            <h4 class="font5-500">${post.user.username}</h4>
                            <span>|</span>
                            <span>${formatedDate}</span>
                        </div>
                        ${btnsPost}
                    </header>
                    <div class="content">
                        <h2>${post.title}</h2>
                        <p>${content}</p>
                        <a data-read-modal=${count} class="font4-500" href="">Acessar Publicação</a>
                    </div>
                </article>
            </li>
            `
        )
        count++
    });

    mapLinksModalRead(posts, token)
}


/* ------------------ MAPEAR BOTÕES DOS POSTS ------------------ */
function mapLinksModalRead(posts, token) {
    const user = getUserStorage();
    const linkRead = document.querySelectorAll('[data-read-modal]')
    const btnEdit = document.querySelectorAll('[data-edit-modal]')
    const btnRemove = document.querySelectorAll('[data-remove-modal]')

    linkRead.forEach(link => {
        link.onclick = (event) => {
            event.preventDefault()
            const index = link.getAttribute('data-read-modal')
            const selectedPost = posts[index]
            renderModalRead(selectedPost)
        }
    })

    btnEdit.forEach(btn => {
        btn.onclick = () => {
            eventEditPost(user, btn, posts, token)
        }
    })

    btnRemove.forEach(btn => {
        btn.onclick = () => {
            eventDeletePost(user, btn, posts, token)
        }
    })
}


/* ------------------ EDITAR POSTAGEM CADASTRADA ----------- */
function eventEditPost(user, btn, posts, token) {
    const index = btn.getAttribute('data-edit-modal')
    const selectedPost = posts[index]
    renderModalEdit()

    const form = document.querySelector("form")
    const input = document.querySelector("input")
    const textArea = document.querySelector("textarea")

    input.value = selectedPost.title
    textArea.value = selectedPost.content

    const elements = [...form.elements]

    form.onsubmit = async (event) => {
        event.preventDefault()
        const body = {}
        elements.forEach(elem => {
            if (elem.tagName == "INPUT" || elem.tagName == "TEXTAREA") {
                body[elem.id] = elem.value
            }
        })
        if (await updatePost(body, token, selectedPost.id)) {
            await renderPosts(token, user.id)
            form.remove()
        } else {
            console.log('Erro ao editar postagem.')
        }
    }
}


/* ------------------ DELETAR POSTAGEM CADASTRADA ----------- */
function eventDeletePost(user, btn, posts, token) {
    const index = btn.getAttribute('data-remove-modal')
    const selectedPost = posts[index]
    const toast = document.querySelector(".tooltips")
    renderModalDelete()

    const form = document.querySelector("form")
    form.onsubmit = async (event) => {
        event.preventDefault()

        if (await deletePost(token, selectedPost.id)) {
            await renderPosts(token, user.id)
            form.remove()
            toast.classList.add('show-toast')
            setTimeout(() => {
                toast.classList.remove('show-toast')
            }, 10000)
        } else{
            console.log('Erro ao deletar postagem.')
        }
    }
}


/* ------------------ INSERIR NOVA POSTAGEM --------------- */
export function insertNewPost() {
    const token = getLocalStorage('user-token')
    const user = getUserStorage();
    const form = document.querySelector('form')
    const elements = [...form.elements]

    form.addEventListener("submit", async (event) => {
        event.preventDefault()
        const body = {}

        elements.forEach(elem => {
            if (elem.tagName == "INPUT" || elem.tagName == "TEXTAREA") {
                body[elem.id] = elem.value
            }
        })

        if (await newPost(body, token)) {
            renderPosts(token, user.id)
            form.remove()
        }
        else {
            console.log('erro na postagem')
        }
    })
}


/* ------------------ FORMATAR DATA ----------------- */
export function formatDate(postCreatedAt) {
    const date = new Date(postCreatedAt)
    const locale = 'pt-br'
    const option = {
        month: 'long',
        year: 'numeric',
    }
    const dateStr = new Date(date).toLocaleDateString(locale, option)
    return dateStr[0].toUpperCase() + dateStr.slice(1).toLowerCase()
}