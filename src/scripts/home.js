import { clearLocalStorage, getLocalStorage, getUserStorage } from "./localStorage.js"
import { renderModalRead } from "./modal.js"
import { getPosts } from "./requests.js"

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
function renderProfile(token) {
    // console.log(user)
    const user = getUserStorage();
    const userProfile = document.querySelector('.user-profile')
    const { username, avatar } = user
    userProfile.insertAdjacentHTML('afterbegin',
        `<img src="${avatar}" alt="foto de perfil">
         <div class="container-login hidden-profile">
            <span class="font4-500">${username}</span>
            <div>
                <img src="../images/sign-out.svg" alt="">
                <span id='logout' class="font4-500">Sair da Conta</span>
            </div>
         </div>
        `
    )

    mapBtnProfile()
    renderPosts(token, user.id)
}



/* --------------- MAPEAR BOTÕES PARA ACESSAR ÚLTIMOS USUÁRIOS -------------- */
function mapBtnProfile() {
    const profile = document.querySelector("[alt='foto de perfil']")
    const containerLogin = document.querySelector('.container-login')
    const logout = document.getElementById('logout')

    profile.onclick = () => {
        console.log('containerLogin')

        containerLogin.classList.toggle('hidden-profile')
    }

    logout.onclick = () => {

        clearLocalStorage();
        window.location.replace("../../index.html");
    }
}


/* --------------- RENDERIZAR POSTS CADASTRADOS -------------- */
async function renderPosts(token, userId) {
    // console.log(token)
    const listFeed = document.querySelector('.list-feed')
    const posts = await getPosts(token)
    listFeed.innerHTML = ''
    console.log(posts)
    let count = 0

    posts.forEach(post => {
        const content = post.content.substr(0, 145) + '...'
        const formatedDate = formatDate(post.createdAt)

        let btnsPost = ''
        if (post.user.id == userId) {
            btnsPost = `<div>
                            <button class="btn-clean-small">Editar</button>
                            <button class="btn-gray-small">Excluir</button>
                         </div>`
        }

        listFeed.insertAdjacentHTML('beforeend',
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

    mapLinksModalRead(posts)
}


/* ------------------ MAPEAR LINKS MODAL DE LEITURA ------------------ */
function mapLinksModalRead(posts) {
    const linksRead = document.querySelectorAll('[data-read-modal]')
    console.log(linksRead)
    linksRead.forEach(link => {
        link.onclick = (event) => {
            event.preventDefault()
            const index = link.getAttribute('data-read-modal')
            // console.log(index)
            const selectedPost = posts[index]
            // console.log(selectedPost);
            renderModalRead(selectedPost)
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






/*                 <li class="post">
                    <article>
                        <header>
                            <div class="font5-500">
                                <img src="../images/Ellipse.png" alt="foto de perfil">
                                <h4 class="font5-500">Samuel Leão</h4>
                                <span>|</span>
                                <span>Outubro de 2022</span>
                            </div>
                            <div>
                                <button class="btn-clean-small">Editar</button>
                                <button class="btn-gray-small">Excluir</button>
                            </div>
                        </header>
                        <div class="content">
                            <h2>Outubro Rosa: Detalhes sobre a importância da prevenção do câncer de mama em cadelas e
                                gatas
                            </h2>
                            <p>Assim como em humanos, cadelas e gatas também podem desenvolver câncer de mama. Ainda
                                hoje,
                                para ambas as espécies, o câncer de mama tem maior...</p>
                            <a class="font4-500" href="">Acessar Publicação</a>
                        </div>
                    </article>
                </li>
                <li class="post">
                    <article>
                        <header>
                            <div class="font5-500">
                                <img src="../images/Ellipse.png" alt="foto de perfil">
                                <h4 class="font5-500">Samuel Leão</h4>
                                <span>|</span>
                                <span>Outubro de 2022</span>
                            </div>
                            <div>
                                <button class="btn-clean-small">Editar</button>
                                <button class="btn-gray-small">Excluir</button>
                            </div>
                        </header>
                        <div class="content">
                            <h2>Outubro Rosa: Detalhes sobre a importância da prevenção do câncer de mama em cadelas e
                                gatas
                            </h2>
                            <p>Assim como em humanos, cadelas e gatas também podem desenvolver câncer de mama. Ainda
                                hoje,
                                para ambas as espécies, o câncer de mama tem maior...</p>
                            <a class="font4-500" href="">Acessar Publicação</a>
                        </div>
                    </article>
                </li> */