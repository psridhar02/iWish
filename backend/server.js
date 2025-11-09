const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const products = require('./routes/products');  
const authRoutes = require('./routes/auth');
const forumRoutes = require('./routes/forum');
const wishlistRoutes = require('./routes/wishlist');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.use('/api/products', products);
app.use('/api/auth', authRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/wishlist', wishlistRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


