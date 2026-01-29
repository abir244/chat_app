import express from 'express';
import { getMessages } from '../controllers/chatController.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const messages = await getMessages();
  res.json(messages);
});

export default router;
