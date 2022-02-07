import { useState } from "react";
import { useMutation } from '@apollo/react-hooks';

import {
    SIGNUP_MUTATION,
    LOGIN_MUTATION
} from '../graphql';

/**
 *  Dealing with user authentication and login things
 */
const useAuth = () => {
    const usertoken = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    // State of login
    const [auth, setAuth] = useState(Boolean(usertoken));
    const [user, setUser] = useState(username || "");
    
    const [signUp] = useMutation(SIGNUP_MUTATION);
    const [logIn] = useMutation(LOGIN_MUTATION);

    const login = async (email, password) => {
        try {
            const { data } = await logIn({
                variables: {
                    email,
                    password
                }
            });
            setAuth(true);
            setUser(data.login.user.name);
            localStorage.setItem("token", data.login.token);
            localStorage.setItem("username", data.login.user.name);
        } catch (e) {
            throw e;
        }
    }

    const logout = () => {
        setAuth(false);
        setUser("");
        // wipe out token from local storage
        localStorage.removeItem("token");
        localStorage.removeItem("username");
    }

    const signup = async (name, email, password) => {
        try {
            if (!validateEmail(email)) {
                throw new Error("Email 格式錯誤");
            }
            if (!validatePwd(password)) {
                throw new Error("密碼長度需大於等於 6");
            }
            await signUp({
                variables: {
                    name,
                    email,
                    password
                }
            });
        } catch (e) {
            throw e;
        }
    }

    const validateEmail = (email) => {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const validatePwd = (password) => {
        return password.length > 5;
    }


    return {
        auth,
        user,
        login,
        logout,
        signup,
    };
};

export default useAuth;