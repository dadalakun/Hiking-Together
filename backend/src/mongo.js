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
    // 若是前端已經登入的話，在 initialize 需要先登出消除舊的 token
    // 因為舊的 token 是由舊的 userId 所產生，而 initialize 過程中
    // 會把舊 user 洗掉
    // postInit(Number(process.env.SALT_ROUNDS));
}

export default { connect };