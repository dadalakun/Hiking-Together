import { useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import moment from 'moment';

import {
    CREATE_POST_MUTATION,
    UPDATE_POST_MUTATION
} from '../graphql';

/**
 *  Manage the draft, which used to create/update the post at backend
 */
const useDraft = (user) => {
    const [draft, setDraft] = useState({
        id: null,
        title: "",
        genre: [],
        startTime: moment(),
        endTime: moment(),
        peopleOrigin: 1,
        peopleWant: 1,
        detail: "",
        otherInfo: ""
    });
    const [createpost] = useMutation(CREATE_POST_MUTATION);
    const [updatepost] = useMutation(UPDATE_POST_MUTATION);

    const createPost = async () => {
        try {
            // const { data } = 
            await createpost({
                variables: {
                    input: {
                        ...draft,
                        author: user,
                        postTime: parseInt(moment().format("x")),
                    },
                }
            })
            // console.log(data);
            initialize();
        } catch (e) {
            throw e;
        }
    }

    const updatePost = async () => {
        try {
            // const { data } = 
            await updatepost({
                variables: {
                    input: {
                        ...draft,
                        author: user,
                        postTime: parseInt(moment().format("x")),
                    },
                }
            })
            // console.log(data);
            initialize();
        } catch (e) {
            throw e;
        }
    }

    const initialize = () => {
        setDraft({
            id: null,
            title: "",
            genre: [],
            startTime: moment(),
            endTime: moment(),
            peopleOrigin: 1,
            peopleWant: 1,
            detail: "",
            otherInfo: ""
        });
    }

    return {
        draft, setDraft,
        createPost, updatePost,
        initialize
    };
};

export default useDraft;