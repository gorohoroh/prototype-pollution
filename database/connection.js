import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";

export default async function connect() {
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri, {dbName: 'polluted-todos'});
    console.log(`Successfully connected to ${mongoUri}`);
}