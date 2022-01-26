import { useState } from "react"
import styled from "styled-components";

import CssBaseline from "@mui/material/CssBaseline";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import LogInModal from "./LogInModal";
import SignUpModal from "./SignUpModal";
import MainBoard from "./MainBoard";
import Bar from "./TopBar";
import useAuth from "../hooks/useAuth";
import usePost from "../hooks/usePost";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
`;

function App() {
  const [LoginModalVisible, setLoginModalVisible] = useState(false);
  const [SignupModalVisible, setSignupModalVisible] = useState(false);
  const { auth, user, login, logout, signup } = useAuth();
  const { posts, refetch, setLabel, removePost, searchPost } = usePost();
  const [message, setMessage] = useState({open: false, msg: "", type: "error"});

  // Logout
  const handleLogout = () => {
    logout();
    refetch();
    setMessage({open: true, msg: `已登出。`, type: "success"});
  }
  // Click "登入" button on the top bar
  const handleClickOpen = () => { setLoginModalVisible(true) }

  // Login
  const handleLogin = async (email, pwd) => {
    try {
      await login(email, pwd);
      setMessage({open: true, msg: `登入成功，現在可以發布自己的行程。`, type: "success"});
      refetch();
      handleClose();
    } catch (e) {
      throw e;
    }
  }

  // Click "Sign up" at login modal
  const handleClickSignup = () => {
    setLoginModalVisible(false);
    setSignupModalVisible(true);
  }

  // Close login modal
  const handleClose = () => {
    setLoginModalVisible(false);
    setSignupModalVisible(false);
  }

  // Click "Back" at signup modal or finish the signup procedure
  const handlePrev = () => {
    setLoginModalVisible(true);
    setSignupModalVisible(false);
  }

  return (
    <>
      <CssBaseline />
      <Wrapper>
        <Bar isLogIn={auth} user={user} handleClickOpen={handleClickOpen} logout={handleLogout} />
        <MainBoard
          isLogIn={auth} user={user}
          posts={posts} setLabel={setLabel}
          removePost={removePost}
          refetch={refetch}
          searchPost={searchPost}
          setMessage={setMessage}
        />
      </Wrapper>
      <LogInModal
        visible={LoginModalVisible}
        handleClose={handleClose}
        login={handleLogin}
        handleClickSignup={handleClickSignup}
        setMessage={setMessage}
      />
      <SignUpModal
        visible={SignupModalVisible}
        handleClose={handleClose}
        handlePrev={handlePrev}
        signup={signup}
        setMessage={setMessage}
      />
      <Snackbar
        open={message.open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={() => setMessage({...message, open: false})}
      >
        <Alert severity={message.type}>{message.msg}</Alert>
      </Snackbar>
    </>
  );
}

export default App;
