export function getLocalStorage() {
    const token = localStorage.getItem('user-token')
    return JSON.parse(token)
}

export function setLocalStorage(local, data) {
    console.log('storage')
    localStorage.setItem(local, JSON.stringify(data))
}