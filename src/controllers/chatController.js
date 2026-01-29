import Chat from '../models/chatModel.js';

// Save a new chat message to MongoDB
export async function saveMessage(data) {
  try {
    const chat = new Chat({
      sender: data.sender,
      message: data.message
    });

    const savedMessage = await chat.save();
    return savedMessage;

  } catch (error) {
    console.error('❌ Error saving message:', error);
    throw error;
  }
}

// Get all previous chat messages from MongoDB
export async function getMessages() {
  try {
    const messages = await Chat.find().sort({ timestamp: 1 });
    return messages;

  } catch (error) {
    console.error('❌ Error fetching messages:', error);
    throw error;
  }
}
