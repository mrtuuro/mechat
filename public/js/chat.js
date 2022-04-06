const socket = io()


socket.on('message', (welcomeMessage) => {
    console.log(welcomeMessage)
    document.getElementById('welcome').innerHTML = welcomeMessage
})

document.querySelector('#message-form').addEventListener('submit', (event) => {
    event.preventDefault()
    const message = event.target.elements.message.value
    socket.emit('sendMessage', message)
})

socket.on('sendMessage', (clientMessage) => {
    console.log(clientMessage)
    document.getElementById('welcome').innerHTML = clientMessage
})
