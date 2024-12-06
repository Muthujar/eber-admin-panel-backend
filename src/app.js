const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/apiRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Start server
app.listen(PORT, () => {

  console.log(`Server running on http://localhost:${PORT}`);
});
