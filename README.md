# 💬 TalkTrove

TalkTrove is a personal learning project built to understand how **WebSockets**, **Socket.io**, **real-time data transmission**, and **event-driven architecture** work in a real-world full-stack application.

The app includes essential chat features such as real-time messaging, group creation, group renaming, and adding/removing members, allowing you to explore how instant communication is implemented in modern web apps.

---

## 🧠 What This Project Is About

This project's main purpose is to help understand:

### 🔌 WebSockets

WebSockets allow persistent, two-way communication between client and server.

Unlike HTTP (which is request → response), WebSockets stay open and allow:
- Instant data updates
- Live chat
- Multiplayer interactions
- Real-time notifications

Perfect for anything that needs live behaviour.

### 🟣 What is Socket.io?

**Socket.io** is a JavaScript library built on top of WebSockets that makes real-time communication:
- Easier
- More reliable
- Beginner-friendly
- Cross-browser supported

Socket.io handles:
- ✔ Reconnection
- ✔ Room / group management
- ✔ Event listeners
- ✔ Broadcasting messages
- ✔ Fallbacks for old browsers

For beginners, Socket.io is the best starting point to learn real-time systems because you don't have to deal with low-level WebSocket code manually.

### ⚡ Real-Time Data Transmission

Real-time data means:
- A message sent by one user instantly appears for others
- No page reload
- No manual refreshing
- The UI updates the moment the event happens

This project uses Socket.io to transmit messages, group updates, and user list changes instantly.

### 🌀 Event-Driven Architecture

Real-time apps use "events" instead of request/response.

Examples:
- `"send_message"`
- `"receive_message"`
- `"group_created"`
- `"member_added"`

Each event triggers functionality both on the client and server.

This architecture makes the system scalable, clean, and easy to extend.

---

## ✨ Features Implemented

- ✅ Real-time one-to-one and group messaging
- ✅ Create groups
- ✅ Rename groups
- ✅ Add/remove members
- ✅ Automatically update UI when a group changes
- ✅ Smooth Socket.io connection handling
- ✅ Fixed localStorage + state issues in earlier commits
- ✅ Deployment-ready configuration (coolify.json)

---

## 📁 Project Structure

```
/
├── client/       # Frontend (React)
├── server/       # Backend (Node.js, Express, Socket.io)
└── README.md
```

### 🟦 Client (Frontend)

The frontend is built using:
- **React**
- **Vite** (fast build tool)
- **Socket.io-client** (to connect to backend)
- **Axios** (API calls)
- **Tailwind CSS** / custom components
- Chat UI, message list, sidebar, group UI, modal forms

The client listens for socket events and updates the UI instantly when:
- A message arrives
- A group is renamed
- Members are added / removed

### 🟧 Server (Backend)

The backend uses:
- **Node.js**
- **Express.js**
- **Socket.io** (real-time communication)
- **MongoDB + Mongoose**
- **JWT authentication**
- REST APIs for user/group CRUD
- Socket events for live operations

The server:
- Handles socket connections
- Emits events to rooms (groups)
- Stores chat + group data
- Broadcasts updates to clients

---

## 🛠️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Sultan00786/TalkTrove.git
cd TalkTrove
```

### 2. Install dependencies

**Install client dependencies:**
```bash
cd client
npm install
```

**Install server dependencies:**
```bash
cd server
npm install
```

### 3. Environment Variables

**Inside `/server/.env`:**
```env
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
CLIENT_URL=http://localhost:5173
PORT=5000
```

**Inside `/client/.env`:**
```env
VITE_SERVER_URL=http://localhost:5000
```

### 4. Start the backend

```bash
cd server
npm start
```

### 5. Start the frontend

```bash
cd client
npm run dev
```

**Frontend will start on:**  
👉 http://localhost:5173

**Backend will start on:**  
👉 http://localhost:5000

---

## 🚀 Technologies Used

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React, Vite, Socket.io-client, Axios, Tailwind CSS |
| **Backend** | Node.js, Express.js, Socket.io, MongoDB, Mongoose, JWT |
| **Real-time** | WebSockets, Socket.io |
| **Database** | MongoDB |

---

## 📚 Learning Outcomes

- How WebSockets maintain persistent connections
- How Socket.io simplifies real-time communication
- Event-driven architecture patterns
- Room/group management in chat applications
- State synchronization between client and server
- Real-time UI updates without polling
- JWT authentication flow
- MongoDB schema design for chat applications

---

## 🤝 Contributing

This is a learning project, but contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

---

## 📝 License

This project is open source and available for educational purposes.

---

## 👤 Author

**Sultan00786**  
GitHub: [@Sultan00786](https://github.com/Sultan00786)

---

## ⭐ Show Your Support

If this project helped you learn something new, give it a ⭐️!

---

**Happy Learning! 🎉**
