const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogs');
const dbConfig = require('./config/db');

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to the MongoDB database');
});

// Routes
app.use('/api/blogs', blogRoutes);

// const express = require('express');
// const app = express();
const path = require('path'); // Import path module

// Define route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Other routes...


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
