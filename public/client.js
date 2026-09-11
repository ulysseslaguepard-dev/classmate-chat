const socket = io();

let currentUser = null;
let isJoined = false;

const nameInput = document.getElementById('nameInput');
const joinBtn = document.getElementById('joinBtn');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const messagesArea = document.getElementById('messagesArea');
const usersList = document.getElementById('usersList');
const userCount = document.getElementById('userCount');
const messageInputSection = document.querySelector('.message-input-section');
const userInputSection = document.querySelector('.user-input-section');

// Join Chat
joinBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name) {
        currentUser = name;
        socket.emit('join', { name });
        isJoined = true;
        userInputSection.style.display = 'none';
        messageInputSection.style.display = 'flex';
        messagesArea.innerHTML = '';
        messageInput.focus();
    } else {
        alert('Please enter your name!');
    }
});

// Send Message
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = messageInput.value.trim();
    if (message && isJoined) {
        socket.emit('message', { text: message });
        messageInput.value = '';
        messageInput.focus();
    }
}

// Socket Events
socket.on('userJoined', (data) => {
    addSystemMessage(`${data.name} joined the chat`);
    updateUserCount(data.userCount);
    updateUsersList(data.users);
});

socket.on('userLeft', (data) => {
    addSystemMessage(`${data.name} left the chat`);
    updateUserCount(data.userCount);
    updateUsersList(data.users);
});

socket.on('message', (data) => {
    addMessage(data.name, data.text, data.timestamp, data.name === currentUser);
});

socket.on('usersUpdate', (data) => {
    updateUserCount(data.userCount);
    updateUsersList(data.users);
});

socket.on('disconnect', () => {
    addSystemMessage('Connection lost. Attempting to reconnect...');
});

socket.on('connect', () => {
    if (isJoined) {
        addSystemMessage('Reconnected to chat');
    }
});

// Helper Functions
function addMessage(name, text, timestamp, isOwn) {
    const messageEl = document.createElement('div');
    messageEl.classList.add('message');
    if (isOwn) messageEl.classList.add('own');
    else messageEl.classList.add('other');

    const time = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    messageEl.innerHTML = `
        <div class="message-content">
            <div class="message-header">${name}</div>
            <div>${escapeHtml(text)}</div>
            <div class="message-timestamp">${time}</div>
        </div>
    `;

    messagesArea.appendChild(messageEl);
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

function addSystemMessage(text) {
    const messageEl = document.createElement('div');
    messageEl.classList.add('system-message');
    messageEl.textContent = text;
    messagesArea.appendChild(messageEl);
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

function updateUserCount(count) {
    userCount.textContent = count;
}

function updateUsersList(users) {
    usersList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user;
        usersList.appendChild(li);
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Prevent multiple joins
nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        joinBtn.click();
    }
});
