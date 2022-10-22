export function getLocalStorage() {
    const token = localStorage.getItem('user-token')
    return JSON.parse(token)
}

export function getUserStorage() {
    const user = localStorage.getItem('user-profile')
    return JSON.parse(user)
}

export function setLocalStorage(local, data) {
    localStorage.setItem(local, JSON.stringify(data))
}

export function clearLocalStorage() {
    localStorage.removeItem('user-token')
    localStorage.removeItem('user-profile')
}