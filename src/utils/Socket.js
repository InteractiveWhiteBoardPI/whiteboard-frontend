export default function Socket(socketEndPoint="") {
    this.socket = new WebSocket(`${process.env.REACT_APP_BACKEND_URL}${socketEndPoint}`)
}

Socket.prototype.send = function(message) {
    this.socket.send(message)
}
Socket.prototype.listen = function(callback) {
    this.socket.onmessage = callback
}