import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Item from "./models/item.js";  // Import the Item model

dotenv.config();

const app = express();

// Serve static files from the 'public' folder
app.use(express.static("public"));

app.use(express.json()); // To parse JSON request body

// MongoDB connection with extended timeout settings
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/JewelryHaven";
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 50000,  // Increase timeout to 50 seconds
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './public' });
});

// Route to add a new item to MongoDB
app.post('/add-item', async (req, res) => {
  console.log('Request body:', req.body);
  const { name, price } = req.body;
  try {
    const item = new Item({ name, price });
    await item.save();
    res.json({ message: 'Item added successfully', item });
  } catch (err) {
    console.error('Error details:', err); 
    res.status(500).json({ error: 'Error adding item' });
  }
});

// Route to get all items from MongoDB
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching items' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
