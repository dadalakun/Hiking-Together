const User = {
    async posts (parent, args, { db }, info) {
        await parent.populate("posts");
        return parent.posts;
    },
};

export default User;