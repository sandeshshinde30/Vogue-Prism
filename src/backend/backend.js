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
    category: String,
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

// Route to Get Products by Category or Name
app.get('/api/getProducts', async (req, res) => {
    const { category, name } = req.query; // Get category and name from query parameters

    try {
        const query = {};
        
        // Filter by category if provided
        if (category) {
            query.category = category;
        }
        
        // Filter by name (case insensitive) if provided
        if (name) {
            query.title = { $regex: name, $options: 'i' };
        }

        const products = await Product.find(query);
        
        // Map products to include only the first image
        const result = products.map(product => ({
            ...product._doc, // Spread the existing product data
            img: product.images[0] // Include only the first image
        }));

        res.status(200).json(result);
    } catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).json({ error: 'Failed to retrieve products.' });
    }
});

// Delete a product by ID
app.delete('/api/deleteProduct/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const result = await Product.findByIdAndDelete(productId); // Use the correct Product model

        if (!result) {
            return res.status(404).send({ error: "Product not found" });
        }

        res.status(200).send({ message: "Product deleted successfully" });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send({ error: "Failed to delete product" });
    }
});

app.put('/api/updateProducts/:id', async (req, res) => {
    const productId = req.params.id;
    console.log('Received request to update product with ID:', productId);

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            console.log('Product not found:', productId);
            return res.status(404).json({ message: 'Product not found' });
        }

        console.log('Product updated successfully:', updatedProduct);
        res.status(200).json({ message: 'Product updated successfully!', product: updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product.', details: error.message });
    }
});


// Start the server
app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
