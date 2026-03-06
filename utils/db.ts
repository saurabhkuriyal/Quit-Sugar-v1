import mongoose from "mongoose";

const connectionString = process.env.MONGODB_URI;

if (!connectionString) {
    throw new Error("Please provide MONGODB_URI in the environment variables");

}

type ConnectionObject = {
    isConnected?: number;
}

const existingConnection: ConnectionObject = {};

export async function dbConnect() {
    if (existingConnection.isConnected) {
        console.log("Already connected to MongoDB");
        return;
    }

    try {
        const db = await mongoose.connect(connectionString as string);
        existingConnection.isConnected = db.connections[0].readyState;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
}
export default dbConnect;
