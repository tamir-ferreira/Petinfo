import { formatDate, insertNewPost } from "./home.js"

const listModals = document.querySelector('.list-modals')


/* ------------------ RENDERIZAR MODAL DE LEITURA DE POST --------------- */
export function renderModalRead(post) {

    const formatedDate = formatDate(post.createdAt)
    listModals.innerHTML = ''

    listModals.insertAdjacentHTML('afterbegin',
        `<article class="modal-container">
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

    const btnClose = document.querySelector('.btn-close')
    btnClose.onclick = (event) => event.target.closest('article').remove()
}


/* ------------------ RENDERIZAR MODAL DE INCLUSÃO DE POST --------------- */
export function renderModalCreate() {
    listModals.innerHTML = ''

    listModals.insertAdjacentHTML('afterbegin',
        `<form class="modal-container">
            <div class="modal">
                <header>
                    <h3 class="font3-500">Criando novo post</h3>
                    <button type="button" class="btn-gray-small btn-close">x</button>
                </header>
                <div class="edit-title-container">
                    <label class="font4-500" for="title">Título do post</label>
                    <input required type="text" id="title" placeholder="Digite o título aqui...">
                </div>
                <div class="edit-content-container">
                    <label class="font4-500" for="content">Conteúdo do post</label>
                    <textarea required id="content" placeholder="Desenvolva o conteúdo do post aqui..."></textarea>
                </div>
                <div class="edit-buttons">
                    <button type="button" id="btn-cancel" class="btn-gray">Cancelar</button>
                    <button id="btn-insert" class="btn-brand">Publicar</button>
                </div>
            </div>
        </form>
     `
    )

    const btnClose = document.querySelector('.btn-close')
    const btnCancel = document.querySelector('#btn-cancel')
    btnClose.onclick = (event) => event.target.closest('form').remove()
    btnCancel.onclick = (event) => event.target.closest('form').remove()

    insertNewPost()
}


/* ------------------ RENDERIZAR MODAL DE EDIÇÂO DE POST --------------- */
export function renderModalEdit() {
    listModals.innerHTML = ''

    listModals.insertAdjacentHTML('afterbegin',
        `<form class="modal-container">
            <div class="modal">
                <header>
                    <h3 class="font3-500">Edição</h3>
                    <button type="button" class="btn-gray-small btn-close">x</button>
                </header>
                <div class="edit-title-container">
                    <label class="font4-500" for="title">Título do post</label>
                    <input type="text" id="title">
                </div>
                <div class="edit-content-container">
                    <label class="font4-500" for="content">Conteúdo do post</label>
                    <textarea name="" id="content"></textarea>
                </div>
                <div class="edit-buttons">
                    <button type="button" id="btn-cancel" class="btn-gray">Cancelar</button>
                    <button id="btn-save" class="btn-brand">Salva Alterações</button>
                </div>
            </div>
        </form> 
     `
    )

    const btnClose = document.querySelector('.btn-close')
    const btnCancel = document.querySelector('#btn-cancel')
    btnClose.onclick = (event) => event.target.closest('form').remove()
    btnCancel.onclick = (event) => event.target.closest('form').remove()
}


/* ------------------ RENDERIZAR MODAL DE DELEÇÂO DE POST --------------- */
export function renderModalDelete() {
    listModals.innerHTML = ''

    listModals.insertAdjacentHTML('afterbegin',
        `<form class="modal-container">
            <div class="modal">
                <header>
                    <h3 class="font3-500">Confirmação de exclusão</h3>
                    <button type="button" class="btn-gray-small btn-close">x</button>
                </header>
                <div class="edit-content-container">
                    <h2 class="font2-500">Tem certeza que deseja excluir este post?</h2>
                    <p class="font4-400">Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de
                        concluir.</p>
                </div>
                <div class="remove-buttons">
                    <button type="button" id="btn-cancel" class="btn-gray">Cancelar</button>
                    <button id="btn-delete" class="btn-alert">Sim, excluir este post</button>
                </div>
            </div>
        </form>
     `
    )

    const btnClose = document.querySelector('.btn-close')
    const btnCancel = document.querySelector('#btn-cancel')
    btnClose.onclick = (event) => event.target.closest('form').remove()
    btnCancel.onclick = (event) => event.target.closest('form').remove()
} 