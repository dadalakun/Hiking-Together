import mongoose from 'mongoose'
import dotenv from 'dotenv-defaults'
import { postInit } from "./testData.js";

async function connect () {
    dotenv.config();

    const dboptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    mongoose.connect(process.env.MONGO_URL, dboptions).then
        (() => { console.log('mongo db connection created') });
    // Uncomment this line and restart the backend server to generate test data
    // postInit(Number(process.env.SALT_ROUNDS));
}

export default { connect };