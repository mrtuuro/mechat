const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')


const app = express()
const server = http.createServer(app)
const io = socketio(server)

const PORT = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))


const welcomeMessage = 'Welcome !!!'

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.emit('message', welcomeMessage)
    socket.broadcast.emit('message', 'A new user has joined')

    socket.on('sendMessage', (clientMessage) => {
        io.emit('sendMessage', clientMessage)
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left')
    })
})


server.listen(PORT, () => {
    console.log(`Server is up on port: ${PORT}`)
})