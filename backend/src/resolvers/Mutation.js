import { getUserByEmail, getUserByName, getUserById, newUser, newPost, validateUser } from '../utils.js';

const Mutation = {
    async signup (parent, { name, email, password }, { db, SALT_ROUNDS }, info) {
        if (await getUserByName(db, name)) {
            throw new Error(`User Name (${name}) already been used.`);
        }
        if (await getUserByEmail(db, email)) {
            throw new Error(`Email (${email}) already been used.`);
        }
        return newUser(db, name, email, password, SALT_ROUNDS);
    },
    async login (parent, { email, password }, { db, SECRET }, info) {
        const user = await getUserByEmail(db, email);
        if (!user) {
            throw new Error(`Email (${email}) is not registered.`);
        }
        return validateUser(password, user, SECRET);
    },
    async createpost (parent, { input }, { db, userId }, info) {
        if (!userId) {
            throw new Error("Please login first.");
        }
        const newpost = await newPost(db, userId, input);
        return newpost;
    },
    async updatepost (parent, { input }, { db, userId }, info) {
        if (!userId) {
            throw new Error("Please login first.");
        }
        const user = await getUserById(db, userId);
        let index = user.posts.indexOf(input.id);
        if (index === -1) {
            throw new Error(`User${user.name} is not the author of the post.`);
        }
        const newpost = 
            await db.Post.findOneAndUpdate({ _id: input.id }, input, { new: true });
        return newpost;
    },
    async removepost (parent, { postId }, { db, userId }, info) {
        if (!userId) {
            throw new Error("Please login first.");
        }
        // Remove post ref from posts
        const user = await getUserById(db, userId);
        let index = user.posts.indexOf(postId);
        if (index === -1) {
            throw new Error(`User${user.name} is not the author of the post.`);
        } else {
            user.posts.splice(index, 1);
        }
        await user.save();
        // Remove post ref from labelPosts from every users
        const users = await db.User.find({});
        await users.forEach((u) => {
            let index = u.labelPosts.indexOf(postId);
            u.labelPosts.splice(index, 1);
            u.save();
        });
        // Remove the post itself
        await db.Post.deleteOne({ _id: postId });
        
        return postId;
    },
    async labelpost (parent, { postId }, { db, userId }, info) {
        if (!userId) {
            throw new Error("Please login first.");
        }
        const user = await getUserById(db, userId);
        user.labelPosts.push(postId);
        await user.save();
        return postId;
    },
    async unlabelpost (parent, { postId }, { db, userId }, info) {
        if (!userId) {
            throw new Error("Please login first.");
        }
        const user = await getUserById(db, userId);
        let index = user.labelPosts.indexOf(postId);
        if (index !== -1) {
            user.labelPosts.splice(index, 1);
        } 
        await user.save();
        return postId;
    },
    async testtoken (parent, args, { db, userId }, info) {
        if (!userId) {
            throw new Error("Please login first.");
        }
        return await db.User.findById(userId);
    },
}

export default Mutation;