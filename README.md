# ClassMate Chat 💬

A real-time chat application built for classmates to communicate and collaborate online.

## Features ✨

- **Real-time Messaging**: Instant message delivery using Socket.IO
- **User Management**: See who's online and join the chat with your name
- **Beautiful UI**: Modern, responsive design with gradient styling
- **User List**: Live list of all connected users
- **System Messages**: Get notified when users join or leave
- **Timestamps**: Every message includes a timestamp
- **Mobile Friendly**: Fully responsive design works on all devices
- **Message Scrolling**: Auto-scroll to latest messages
- **Input Validation**: Safe HTML escaping to prevent injection attacks

## Installation 🚀

### Prerequisites
- Node.js (v14 or higher)
- npm

### Steps

1. Clone the repository:
```bash
git clone https://github.com/ulysseslaguepard-dev/classmate-chat.git
cd classmate-chat
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Development 🛠️

For development with auto-reload:
```bash
npm run dev
```

## How to Use 📝

1. **Enter Your Name**: Type your name in the input field
2. **Join Chat**: Click the "Join Chat" button
3. **Send Messages**: Type your message and press Enter or click Send
4. **View Users**: See all online users in the Users List panel
5. **Leave**: Simply close the tab or refresh the page

## Project Structure 📁

```
classmate-chat/
├── server.js              # Express server with Socket.IO
├── package.json           # Project dependencies
├── public/
│   ├── index.html         # Frontend HTML
│   ├── client.js          # Frontend JavaScript
│   └── styles.css         # Frontend Styles
└── README.md              # This file
```

## Technology Stack 🔧

- **Backend**: Node.js, Express.js, Socket.IO
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Real-time Communication**: Socket.IO
- **Server**: Express.js

## Features Details 📋

### Real-time Chat
- Messages are delivered instantly to all connected users
- Your messages appear on the right, others' on the left
- Each message shows the sender's name and timestamp

### User Management
- Join with your name
- See live count of online users
- List of all connected users
- System messages notify when users join/leave

### Responsive Design
- Works on desktop, tablet, and mobile
- Touch-friendly buttons and inputs
- Optimized layout for all screen sizes

## Security Features 🔒

- HTML escape for message content (prevents XSS attacks)
- Input validation
- Message length limits (500 characters)
- Name length limits (20 characters)

## Future Enhancements 🚀

- User authentication
- Message history/persistence
- Private messaging
- Chat rooms
- Emoji support
- File sharing
- Message editing/deletion
- User profiles
- Dark mode

## Contributing 👥

Feel free to fork this project and submit pull requests for any improvements!

## License 📄

MIT License - feel free to use this project for your classroom needs.

## Support 💪

If you encounter any issues, please open an issue on GitHub or check the server console for error messages.

---

**Share the chat link with your classmates and start chatting!** 🎉
