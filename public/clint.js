const socket = io();

let name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message_area');

do {
    name = prompt('Please enter your name:');
} while (!name);

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && textarea.value.trim()) {
        sendMessage(e.target.value.trim());
    }
});

function sendMessage(message) {
    let msg = {
        user: name,
        message: message
    };
    appendMessage(msg, 'outgoing');
    textarea.value = ''; 

    // Emit the message to server
    socket.emit('message', msg);
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    mainDiv.classList.add(type, 'message');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
    messageArea.scrollTop = messageArea.scrollHeight; 
}

// Receive messages
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
});
