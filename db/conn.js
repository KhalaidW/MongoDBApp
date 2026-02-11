// Import libraries
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

// Setup/Configure
dotenv.config();

// Get Connection String
const connectionStr = process.env.MONGO_URI || "";

//Setup Mongo CLient
const client = new MongoClient(connectionStr);

let conn;

try {
    conn = await client.connect();

    console.log("MongoDB Connected...")
} catch (err) {
    console.error(err);
    process.exit(1) // IF we cant connect to DB this will close our server. 1 - indicates we closed with error
}

// Choose our database
let db = conn.db('sba');

// Indexes
await db.collection("races").createIndex({ race: 1 });
await db.collection("class").createIndex({ class: 1 });
await db.collection("backgrounds").createIndex({ background: 1 });

// Export out Loaded db module
export default db;