import { getLocalStorage, getUserStorage } from "./localStorage.js"

const verifyPermission = () => {
    const token = getLocalStorage('user-token')
    // console.log(token)
    if (token == '' || token == null) {
        window.location.replace('../../index.html')
    }
}
verifyPermission()

const user = getUserStorage();


/* --------------- CRIAR PROFILE DO USUÁRIO CONECTADO -------------- */
function createUser(user) {
    console.log(user)
    const userProfile = document.querySelector('.user-profile')
    const {username, avatar} = user
    userProfile.insertAdjacentHTML('afterbegin',
        `<img src="${avatar}" alt="foto de perfil">
         <div class="container-login hidden-profile">
            <span class="font4-500">${username}</span>
            <div>
                <img src="../images/sign-out.svg" alt="">
                <span class="font4-500">Sair da Conta</span>
            </div>
         </div>
        `
    )
}

createUser(user)


/* --------------- MAPEAR BOTÕES PARA ACESSAR ÚLTIMOS USUÁRIOS -------------- */
function mapBtnsUsers() {
    const profile = document.querySelector("[alt='foto de perfil']")
    const containerLogin = document.querySelector('.container-login')
    console.log(profile)
    // users.forEach(user => {
        // const btnUser = user.lastElementChild;
        profile.onclick = () => {
            console.log('containerLogin')
        
            containerLogin.classList.toggle('hidden-profile')
        }
        // profile.onmouseout = () => containerLogin.style.display = 'none'
    // });

    const btnUsers = document.querySelectorAll(".btn-user")
    btnUsers.forEach(btnUser => {
        btnUser.onclick = () => {
            const id = btnUser.id

            updateStorageSelected(lastUsers[id], "userGit")
            updateStorageSelected(lastRepos[id], "repoGit")
            updateStorageSelected(lastEmails[id], "emailGit")

            window.location.replace("../profile/index.html");
        }
    })
}

mapBtnsUsers()