import { getUserByName, getUserById } from "../utils.js";

const Query = {
    async me(parent, args, { db, userId }, info) {
        if (!userId) {
            throw new Error("Please login first.");
        }
        return await db.User.findById(userId);
    },
    async posts(parent, { type, query }, { db, userId }, info) {
        // Get all posts
        let posts = await db.Post.find({});
        // If $type and $query are specified, filt the posts arr
        if (type === "title") {
            posts = posts.filter((post) => {
                return post.title.toLowerCase().includes(query.toLowerCase());
            })
        } else if (type === "tag") {
            posts = posts.filter((post) => {
                return (post.genre.some((g) => g.includes(query)));
            })
        } else if (type === "author") {
            posts = posts.filter((post) => {
                return post.author.toLowerCase().includes(query.toLowerCase());
            })
        }
        // $userId is null which means client side is not at
        // the login state, so we don't need to classify
        // whether each post is labeled or created by the user
        if (!userId) {
            return posts;
        }
        // On the other hand, if userId is given, we need to
        // iterate each post checking whether it is labeled
        // or created by the user
        const user = await getUserById(db, userId);
        const myposts = user.posts;
        const labelposts = user.labelPosts;
        // By having  'label' and 'myPost' these boolean fields,
        // frontend can tell the difference between posts and 
        // switch between three tabs
        posts.forEach((post) => {
            post.label = labelposts.includes(post.id);
            post.myPost = myposts.includes(post.id);
        });

        return posts;
    },
}

export default Query;