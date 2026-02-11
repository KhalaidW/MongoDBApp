// Imports
import express from 'express';
import { logReq, globalErr } from './middleware/middlewar.js';
import dotenv from 'dotenv';
import raceRoutes from "./routes/raceRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import backgroundRoutes from "./routes/backgroundRoutes.js";

// Setups
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(logReq);

// Routes
app.use("/api/races", raceRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/backgrounds", backgroundRoutes);

// Global err Handling
app.use(globalErr);

// Listener
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});