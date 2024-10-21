const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON requests

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/vogue_prism_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define Product Schema and Model
const ProductSchema = new mongoose.Schema({
    title: String,
    description: String,
    mrp: Number,
    price: Number,
    sizes: [String],
    colors: [String],
    images: [String]
});

const Product = mongoose.model('Product', ProductSchema);

// Route to Add a New Product
app.post('/api/products', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add product.' });
    }
});

// Start the server
app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
