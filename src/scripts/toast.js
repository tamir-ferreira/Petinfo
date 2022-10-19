const toast = (title, message) =>{
    const body = document.querySelector("body")

    const container = document.createElement("div")
    container.classList.add("toast-container")

    const icon = document.createElement("img")
    icon.alt = `Mensagem de ${title} `

    if (title == "Sucesso!") {
        container.classList.add("success Toast")
        icon.src = "./img/ok.jpg"
    } else {
        
    }
}