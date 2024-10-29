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

// Product Schema and Model
const ProductSchema = new mongoose.Schema({
    title: String,
    description: String,
    mrp: Number,
    price: Number,
    category: String,
    sizes: [String],
    colors: [String],
    isTrending : Boolean,
    images: [String],
    date: String, // Store the date
    time: String, // Store the time
    createdAt: { type: Date, default: Date.now }, // System date and time
    updatedAt: { type: Date, default: Date.now }  // Tracks updates
});

const Product = mongoose.model('Product', ProductSchema);



// Offer Schema and Model
const OfferSchema = new mongoose.Schema({
    imageUrl: String,
    description: String, // Optional field for offer description
    createdAt: { type: Date, default: Date.now }
});
const Offer = mongoose.model('Offer', OfferSchema);



const VisitSchema = new mongoose.Schema({
    count: { type: Number, default: 0 }, // Track total visits
});

const Visit = mongoose.model('Visit', VisitSchema);
module.exports = Visit;



// Route to Add a New Offer Image
app.post('/api/offers', async (req, res) => {
    const { imageUrl, description } = req.body;

    try {
        const newOffer = new Offer({ imageUrl, description });
        await newOffer.save();
        res.status(201).json({ message: 'Offer added successfully!', offer: newOffer });
    } catch (error) {
        console.error('Error adding offer:', error);
        res.status(500).json({ error: 'Failed to add offer.' });
    }
});

// Route to Retrieve All Offers
app.get('/api/offers', async (req, res) => {
    try {
        const offers = await Offer.find().sort({ createdAt: -1 }); // Get offers sorted by creation date
        res.status(200).json(offers);
    } catch (error) {
        console.error('Error retrieving offers:', error);
        res.status(500).json({ error: 'Failed to retrieve offers.' });
    }
});

// Route to Delete an Offer by ID
app.delete('/api/offers/:id', async (req, res) => {
    const offerId = req.params.id;

    try {
        const result = await Offer.findByIdAndDelete(offerId);

        if (!result) {
            return res.status(404).json({ error: 'Offer not found' });
        }

        res.status(200).json({ message: 'Offer deleted successfully' });
    } catch (error) {
        console.error('Error deleting offer:', error);
        res.status(500).json({ error: 'Failed to delete offer.' });
    }
});

// Route to Update an Offer by ID
app.put('/api/offers/:id', async (req, res) => {
    const offerId = req.params.id;
    const { imageUrl, description } = req.body;

    try {
        const updatedOffer = await Offer.findByIdAndUpdate(
            offerId,
            { imageUrl, description },
            { new: true, runValidators: true }
        );

        if (!updatedOffer) {
            return res.status(404).json({ error: 'Offer not found' });
        }

        res.status(200).json({ message: 'Offer updated successfully!', offer: updatedOffer });
    } catch (error) {
        console.error('Error updating offer:', error);
        res.status(500).json({ error: 'Failed to update offer.' });
    }
});

// Product Routes
app.post('/api/products', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add product.' });
    }
});

app.get('/api/getProducts', async (req, res) => {
    const { category, name } = req.query;

    try {
        const query = {};
        if (category) query.category = category;
        if (name) query.title = { $regex: name, $options: 'i' };

        const products = await Product.find(query);
        const result = products.map(product => ({
            ...product._doc,
            img: product.images[0]
        }));

        res.status(200).json(result);
    } catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).json({ error: 'Failed to retrieve products.' });
    }
});

app.delete('/api/deleteProduct/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const result = await Product.findByIdAndDelete(productId);

        if (!result) {
            return res.status(404).send({ error: 'Product not found' });
        }

        res.status(200).send({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send({ error: 'Failed to delete product' });
    }
});

app.put('/api/updateProducts/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully!', product: updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product.', details: error.message });
    }
});

// Route to Retrieve a Product by ID
app.get('/api/getProduct/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await Product.findById(productId);
        
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error retrieving product:', error);
        res.status(500).json({ error: 'Failed to retrieve product.' });
    }
});

app.get('/api/getRecentProducts', async (req, res) => {
    try {
        // Calculate the date 3 days ago from now
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

        // Build the query object to filter products created within the last 3 days
        const query = { createdAt: { $gte: threeDaysAgo } };

        // Fetch the matching products with a limit of 6
        const products = await Product.find(query).sort({ createdAt: -1 }).limit(6);

        // Format the response to include the first image
        const result = products.map(product => ({
            ...product._doc,
            img: product.images[0]  // Include only the first image
        }));

        res.status(200).json(result);
    } catch (error) {
        console.error('Error retrieving recent products:', error);
        res.status(500).json({ error: 'Failed to retrieve recent products.' });
    }
});


app.get('/api/getTrendingProducts', async (req, res) => {
    try {
        // Query to fetch products where isTrending is true
        const query = { isTrending: true };

        // Fetch the matching products with a limit of 6
        const products = await Product.find(query).sort({ createdAt: -1 }).limit(6);

        // Format the response to include the first image
        const result = products.map(product => ({
            ...product._doc,
            img: product.images[0] // Include only the first image
        }));

        res.status(200).json(result);
    } catch (error) {
        console.error('Error retrieving trending products:', error);
        res.status(500).json({ error: 'Failed to retrieve trending products.' });
    }
});

app.get('/api/getTrendingProducts', async (req, res) => {
    try {
        // Query to fetch products where isTrending is true
        const products = await Product.find({ isTrending: true }).sort({ createdAt: -1 });

        // Format the response to include only the first image
        const result = products.map(product => ({
            ...product._doc,
            img: product.images[0]  // Include only the first image
        }));

        res.status(200).json(result);
    } catch (error) {
        console.error('Error retrieving trending products:', error);
        res.status(500).json({ error: 'Failed to retrieve trending products.' });
    }
});


app.get('/api/getProductsCount', async (req, res) => {
   
    try {
              

        const products = await Product.countDocuments();
        const result = products;

        res.status(200).json(result);
    } catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).json({ error: 'Failed to retrieve count products.' });
    }
});


// const Visit = require('./models/Visit');

// Initialize the visit count on server start
async function initializeVisitCount() {
    try {
        let visit = await Visit.findOne();
        if (!visit) {
            console.log('Initializing visit counter...');
            visit = new Visit({ count: 0 });
            await visit.save();
        }
    } catch (error) {
        console.error('Error initializing visit count:', error);
    }
}

initializeVisitCount();


// Route to increment and get the visit count
app.get('/api/track-visit', async (req, res) => {
    try {
        let visit = await Visit.findOne();

        // Increment visit count
        visit.count += 1;
        await visit.save();

        res.status(200).json({ count: visit.count });
    } catch (error) {
        console.error('Error tracking visit:', error);
        res.status(500).json({ error: 'Failed to track visit.' });
    }
});



// Start the server
app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
