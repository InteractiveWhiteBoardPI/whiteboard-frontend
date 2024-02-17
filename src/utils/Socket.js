import { over } from 'stompjs';

class Socket {
  constructor() {
    this.socket = null;
    this.client = null;
    this.connected = false;
  }

  connect() {
    if (!this.client || !this.connected) {
      const socket = new WebSocket(`${process.env.REACT_APP_BACKEND_URL}`);
      this.client = over(socket);
      this.client.debug = null
      this.client.connect({}, () => {
        this.connected = true;
      });

      socket.onclose = () => {
        this.connected = false
        this.client = null
      };
    }
  }

  send(endpoint, message) {
    if (this.client && this.connected) {
      this.client.send(endpoint, {}, message);
    }
  }

  subscribe(endpoint, callback) {
    if (this.client && this.connected) {
      this.client.subscribe(endpoint, callback);
    }
  }
}
const socket = new Socket()
socket.connect()

export default socket
