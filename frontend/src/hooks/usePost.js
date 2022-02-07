import { useEffect, useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import { useQuery } from "@apollo/client";
import {
    GET_POSTS_QUERY,
    LABEL_POST_MUTATION,
    REMOVE_POST_MUTATION,
    UNLABEL_POST_MUTATION
} from "../graphql"

/**
 *  Load all posts at here, and also manage them
 */
const usePost = () => {
    // Load posts
    const [posts, setPosts] = useState([]);
    const { data, refetch } = useQuery(GET_POSTS_QUERY);
    useEffect(() => {
        if (!data) return;
        setPosts(data.posts);
    }, [data]);
    // MUTATION
    const [labelpost] = useMutation(LABEL_POST_MUTATION);
    const [unlabelpost] = useMutation(UNLABEL_POST_MUTATION);
    const [removepost] = useMutation(REMOVE_POST_MUTATION);

    // Add or remove the post from "關注行程"
    const setLabel = async (postId, idx) => {
        try {
            const newposts = JSON.parse(JSON.stringify(posts));
            newposts[idx].label = !posts[idx].label;
            setPosts(newposts);
            // If labeled, unlabel it
            if (posts[idx].label) {
                await unlabelpost({
                    variables: {
                        postId
                    }
                });
            } else {
            // If unlabeled, label it
                await labelpost({
                    variables: {
                        postId
                    }
                });
            }

        } catch (e) {
            throw e;
        }
    }

    // Remove the post from the database 
    const removePost = async (idx) => {
        try {
            await removepost({
                variables: {
                    postId: posts[idx].id
                }
            });
            const newposts = JSON.parse(JSON.stringify(posts));
            newposts.splice(idx, 1);
            setPosts(newposts);
        } catch (e) {
            throw e;
        }
    };

    // Search the posts based on $type, for example:
    // { type: "author", query: "mumi" }
    const searchPost = async (type, query) => {
        try {
            // use the variabled to refetch the querying data
            await refetch({ type, query });
        } catch (e) {
            throw e;
        }
    }

    return {
        posts,
        refetch,
        setLabel,
        removePost,
        searchPost
    };
};

export default usePost;

