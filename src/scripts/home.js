import { getLocalStorage} from "./localStorage.js"

const verifyPermission = () =>{
    const token = getLocalStorage('user-token')
    // console.log(token)
    if (token == '' || token == null) {
        window.location.replace('../../index.html')
    }
}
verifyPermission()