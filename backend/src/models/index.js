import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    posts: [{ type: mongoose.Types.ObjectId, ref: "post" }],
    labelPosts: [{ type: mongoose.Types.ObjectId, ref: "post" }]
});

const PostSchema = new Schema({
    title: String,
    genre: [String],
    startTime: Date,
    endTime: Date,
    peopleOrigin: Number,
    peopleWant: Number,
    detail: String,
    otherInfo: String,
    author: String,
    postTime: Date
});

const User = mongoose.model('user', UserSchema);
const Post = mongoose.model('post', PostSchema);

export default { User, Post };