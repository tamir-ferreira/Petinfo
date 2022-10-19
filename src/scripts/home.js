import { getLocalStorage} from "./localStorage.js.js"

const verifyPermission = () =>{
    const user = getLocalStorage()

    if (user == '') {
        window.location.replace('../login/index.html')
    }
}