import ws, { WebSocketServer, WebSocket } from 'ws';
console.log(`Example app listening on port 8080`)

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws: WebSocket) {
  ws.send(`welcome to the server!`);
  ws.on('message', function message(data:string) {
    console.log('received: %s', data);
    ws.send(`from you -> ${data}`);
    ws.send(`from server -> we received your message: ${data}`);
  });
  ws.on('error', console.error);
  // ws.on('pong', heartbeat(ws));
});
