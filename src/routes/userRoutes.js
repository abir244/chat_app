import express from 'express';
import { registerUser, getAllUsers, loginUser } from '../controllers/userController.js';

const router = express.Router();

// Routes

// Register a new user
router.post('/register', registerUser); // POST /api/v1/users/register

// Login a user
router.post('/login', loginUser);       // POST /api/v1/users/login

// Get all users
router.get('/', getAllUsers);           // GET /api/v1/users

export default router;
