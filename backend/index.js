import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import chatBotRoutes from './routes/chatbot.route.js';
dotenv.config(); // Load env first

const app = express();
app.use(express.json()); // optional, good practice

const port = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(cors());

// Database connection
if (!process.env.MONGO_URL) {
  console.error("MONGO_URL is not defined in .env");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting MongoDB:", error));

  //Defining routes
app.use('/bot/v1/', chatBotRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});