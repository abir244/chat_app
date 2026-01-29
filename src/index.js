import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import connectDB from './config/database.js';
import { saveMessage, getMessages } from './controllers/chatController.js';


connectDB();

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: '*' } // allow frontend
});

io.on('connection', async (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  try {
    const messages = await getMessages();
    socket.emit('chat_history', messages);
    console.log(`📜 Sent ${messages.length} previous messages to ${socket.id}`);
  } catch (err) {
    console.error('❌ Error fetching chat history:', err);
  }

  socket.on('send_message', async (data) => {
    try {
      const saved = await saveMessage(data);
      console.log(`💬 Message from ${saved.sender}: ${saved.message}`);
      io.emit('receive_message', saved);
    } catch (err) {
      console.error('❌ Error saving message:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
