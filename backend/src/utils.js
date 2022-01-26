import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';

const getUserByEmail = (db, email) => {
    return db.User.findOne({ email });
};

const getUserByName = (db, name) => {
    return db.User.findOne({ name });
};

const getUserById = (db, id) => {
    return db.User.findById(id);
}

const newUser = async (db, name, email, password, SALT_ROUNDS) => {
    // Hash the password before saving it into the database
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
    const new_user = await new db.User({ name, email, password: password_hash }).save();
    return {
        user: new_user
    }
};

const validateUser = async (password, user, SECRET) => {
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        throw new Error(`密碼錯誤`);
    }
    const token = jwt.sign({ userId: user.id }, SECRET);
    return {
        token,
        user
    }
};

const newPost = async (db, userId, post) => {
    const newpost = await new db.Post(post).save();
    const author =  await getUserById(db, userId);
    // Add a post ref into User's post list
    author.posts.push(newpost.id);
    await author.save();
    return newpost;
};

function getTokenPayload(token, SECRET) {
    return jwt.verify(token, SECRET);
}

function getUserId(SECRET, req, authToken) {
    if (req) {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace('Bearer ', '');
            if (!token) {
                throw new Error('No token found');
            }
            const { userId } = getTokenPayload(token, SECRET);
            return userId;
        }
    } else if (authToken) {
        const { userId } = getTokenPayload(authToken, SECRET);
        return userId;
    }

    throw new Error('Not authenticated');
}

export {
    getUserByEmail,
    getUserByName,
    getUserById,
    newUser,
    newPost,
    validateUser,
    getUserId,
};