import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js'; // optional if you have chat APIs

const app = express();

// Middleware
app.use(cors()); // allow cross-origin requests
app.use(express.json()); // parse JSON bodies

// Routes
app.use('/api/users', userRoutes);  // login/register
app.use('/api/chat', chatRoutes);   // optional chat REST endpoints if needed

// Test route
app.get('/', (req, res) => {
  res.send('✅ Backend is running!');
});

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;
