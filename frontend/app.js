// import { webSocket } from 'rxjs/webSocket';
window.$ = min$;

window.onload = function() {
    
    // recuperation du contenu du text submmit par utilisateur  
    $('#message-form').on('submit', function(e) {
        e.preventDefault();
        const message = $('#message-input')[0].value;  
        if (message.trim() === '') {
            return;
        }
        console.log("the msg", message);
        ws.send(message); // envoie du message au backend via websocket
        $('#message-input')[0].value = ''; // clear input field
    });


    // creation du websocket pour 2 way communication avec backend
    const ws = new WebSocket('ws://localhost:8080');
    ws.onopen = function() {
        console.log('WebSocket connection established');
    };
    ws.onmessage = function(event) {
        console.log('Message received from server: ' + event.data);
        console.log('message received: ',event.data,$('#messages')[0])
        
        const para = document.createElement("p");
        para.innerHTML = event.data;

        $('#messages')[0].appendChild(para);
    };
    ws.onerror = function(error) {
        console.log('WebSocket error: ' , error);
    };
    ws.onclose = function() {
        console.log('WebSocket connection closed');
    };



}
