const buttonSend = document.querySelector("#buttonSend")
const inputSend = document.querySelector("#inputMensagem")
const chatContainer = document.querySelector("#chatContainer")

buttonSend.addEventListener("click", event =>{
    event.stopPropagation();
    inputSend.value != "" && enviar()
})

const enviar = () => {
    console.log("TESTE esta enviando")
    showMessage(inputSend.value, "me")
    const novaMensagem = postApi(inputSend.value)
    inputSend.value = ""
}

const showMessage = async (message, tipo) => {
    const div = document.createElement("div")
    div.setAttribute("class", `msg ${tipo}`)
    div.innerHTML = message
    await chatContainer.appendChild(div)
}

const postApi = async (message) => {
    const formdata = new FormData();
    formdata.append("msg", message)
    var xhr = new XMLHttpRequest()
    xhr.open("post", "/ambiente")
    xhr.addEventListener("loadstart", event => {
        event.stopPropagation()
        console.log("Enviando mensagem ao servidor")
    }) 
    await xhr.addEventListener("load", event => {
        event.stopPropagation()
        console.log("Recebendo mensagem ao servidor")
        console.log(`Resposta do servidor ${xhr.response}`)
        var respose = JSON.parse(xhr.response)
        Array.from(respose).forEach(item =>{
            showMessage(item, "other")
        })
    }) 
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({msg: message}))
}