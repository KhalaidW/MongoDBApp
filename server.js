// Imports
import express from 'express';

// Setups
const app = express();
const PORT = 2999;

// Middleware
app.use(express.json());

// Routes

// Global middleware

// Global err Handling

// Listener
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});