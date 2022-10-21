import { formatDate } from "./home.js"

export function renderModalRead(post) {
    const listModals = document.querySelector('.list-modals')
    console.log(post)
    const formatedDate = formatDate(post.createdAt)
    listModals.innerHTML = ''

    listModals.insertAdjacentHTML('afterbegin',
        `<article class="modal-read modal-container">
            <div class="modal-rd">
                <header>  
                    <div class="font5-500">
                        <img src="${post.user.avatar}" alt="foto de perfil">
                        <h4 class="font5-500">${post.user.username}</h4>
                        <span>|</span>
                        <span>${formatedDate}</span>
                    </div>
                    <button class="btn-gray-small btn-close">x</button>
                </header>
                <div class="content">
                    <h2>${post.title}</h2>
                    <p>${post.content}</p>
                </div>
            </div>
        </article>
     `
    )
    const modalContainer = document.querySelector('.modal-container')
    const btnClose = document.querySelector('.btn-close')
    modalContainer.classList.remove('modal-read')
    btnClose.onclick = (event) =>{
        const modal = event.target.closest('article')
        console.log(event.target.closest('article'))
        modal.remove()        
    }
}