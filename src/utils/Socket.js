import { over } from "stompjs";

export default class Socket {
  constructor() {
    const socket = new WebSocket(`${process.env.REACT_APP_BACKEND_URL}`);
    const client = over(socket);
    client.debug = null;
    this.client = client;
  }
  
  send(endpoint, message) {
    if (this.client && this.client.connected) {
      this.client.send(endpoint, {}, message);
    }
  }
  
  subscribe(endpoint, callback) {
    this.client.connect({}, () => {
      this.client.subscribe(endpoint, callback);
    });
  }
}


