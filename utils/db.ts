import mongoose from "mongoose";

const connectionString = process.env.MONGODB_URI as string;

if (!connectionString) {
    throw new Error("Please provide a MongoDB connection string");
}

type ConnectionObject = {
    isConnected?: number
}

const existingConnection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if (existingConnection.isConnected) {
        console.log("Already connected to MongoDB");
        return;
    }
    try {
        const db = await mongoose.connect(connectionString);

        existingConnection.isConnected = db.connections[0].readyState
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

export default dbConnect;
