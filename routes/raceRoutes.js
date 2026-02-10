// Imports
import express from 'express';
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Create
router
    .route("/")
    .post(async (req, res) => {
        // Specify/Choose Collection
        let collection = await db.collection('races');

        // Perform Action
        let result = await collection.insertOne(req.body);

        // Return results
        res.json(result);
    })
    .get(async (req, res) => {
        // Specify Collection
        let collection = db.collection('races');

        // Perform Action
        let results = await collection.find({}).toArray();

        // Return the Results
        res.json(results);
    })

// Read - Show All
router
    .route("/:id")
    .patch(async (req, res) =>{
        // Create filterable object
        let query = { _id: new ObjectId(req.params.id )};

        // create update object
        let update = { $set: req.body };

        // Specify Collection
        let collection = db.collection("races");

        // Perform Action
        let results = await collection.updateOne(query, update);

        // Return Results
        res.json(results);
    })

// Update

// Delete

// Show One

export default router;