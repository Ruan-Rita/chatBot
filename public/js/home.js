const buttonSend = document.querySelector("#buttonSend")
const inputSend = document.querySelector("#inputMensagem")
const chatContainer = document.querySelector("#chatContainer")

buttonSend.addEventListener("click", event =>{
    event.stopPropagation();
    console.log("Evento ativo")
    inputSend.value != "" && enviar()
})

const enviar = async () => {
    console.log("TESTE esta enviando")
    const novaMensagem = await postApi(inputSend.value)
    showMessage(yourMessage, botMensagem)
    inputSend.value = ""

// }
// const showMessage = (your, bot) => {
//     const div
// }