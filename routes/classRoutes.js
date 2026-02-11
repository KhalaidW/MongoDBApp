// Imports
import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();
const collection = () => db.collection("class");

// Helpers
const toObjectId = (id) => {
  if (!ObjectId.isValid(id)) return null;
  return new ObjectId(id);
};

// CREATE + READ ALL
router.route("/")
  .post(async (req, res, next) => {
    try {
      const result = await collection().insertOne(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  })
  .get(async (req, res, next) => {
    try {
      const results = await collection()
        .find({})
        .sort({ class: 1 })
        .toArray();

      res.json(results);
    } catch (err) {
      next(err);
    }
  });

// READ ONE + UPDATE + DELETE
router.route("/:id")
  .get(async (req, res, next) => {
    try {
      const _id = toObjectId(req.params.id);
      if (!_id) return res.status(400).json({ error: "Invalid ID" });

      const result = await collection().findOne({ _id });
      if (!result) return res.status(404).json({ error: "Class not found" });

      res.json(result);
    } catch (err) {
      next(err);
    }
  })
  .patch(async (req, res, next) => {
    try {
      const _id = toObjectId(req.params.id);
      if (!_id) return res.status(400).json({ error: "Invalid ID" });

      const result = await collection().updateOne(
        { _id },
        { $set: req.body }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "Class not found" });
      }

      res.json(result);
    } catch (err) {
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const _id = toObjectId(req.params.id);
      if (!_id) return res.status(400).json({ error: "Invalid ID" });

      const result = await collection().deleteOne({ _id });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Class not found" });
      }

      res.json({ message: "Class deleted" });
    } catch (err) {
      next(err);
    }
  });

export default router;
