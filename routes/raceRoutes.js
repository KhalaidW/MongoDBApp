// Imports
import express from 'express';
import db from "../db/conn.js";

const router = express.Router();

// Create
router.route("/").post(async (req, res) => {
    // Specify/Choose Collection
    let collection = await db.collection('races');

    // Perform Action
    let result = await collection.insertOne(req.body);

    // Return results
    res.json(result);
});

// Read - Show All

// Update

// Delete

// Show One

export default router;