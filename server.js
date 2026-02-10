// Imports
import express from 'express';
import { logReq, globalErr } from './middleware/middlewar.js';
import dotenv from 'dotenv';

// Setups
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(logReq)

// Routes

// Global err Handling
app.use(globalErr);

// Listener
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});