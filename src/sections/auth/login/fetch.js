const snd = () => {
  const ws = new WebSocket('ws://localhost:8080');

// Send message to server
ws.send('Hello, server!');
};