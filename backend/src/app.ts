import ws, { WebSocketServer, WebSocket } from 'ws';
console.log(`Example app listening on port 8080`)


const userMap = new Map()


const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', function connection(ws: WebSocket) {
  let currentUserid = userMap.size
  ws.send(`welcome to the server!`);

  ws.on('message', function message(data:any) {
    try{
      // setup user id stuff
      const json = JSON.parse(data)
      if(json.id){
        userMap.set(currentUserid, ws)
      }
    } catch {
      // message received from user
      console.log("is user data", data.id);
      console.log('received: %s', data);
      ws.send(`from you -> ${data}`);

      // sending received msg to target users
      const userEntry  = Array.from(userMap.entries()).filter(([user] )=> user !== currentUserid)
      console.log("sending to",userEntry.map(([id]) =>id), currentUserid);
      userEntry.forEach(([id,ws]) =>ws.send(`from other user -> ${data}`))

    }
  });
  
  ws.on('error', console.error);
  ws.on('close', (ev) => userMap.delete(currentUserid));
  // ws.on('pong', heartbeat(ws));
});
