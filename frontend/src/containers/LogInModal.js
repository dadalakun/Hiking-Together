import { forwardRef, useState, useEffect } from 'react';
import styled from "styled-components";

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LandscapeRoundedIcon from '@mui/icons-material/LandscapeRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';

const StyledDialogContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledStack = styled(Stack)`
  justify-content: space-between;
  width: 75%;
  margin-bottom: 1em;
`;

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LogInModal = ({ visible, handleClose, login, handleClickSignup, setMessage }) => {
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [pwd, setPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [missEmail, setMissEmail] = useState(false);
  const [missPwd, setMissPwd] = useState(false);

  useEffect(() => {
    if (visible) {
      setEmail(localStorage.getItem("email") || "");
    }
  }, [visible]);

  const handlelogin = async () => {
    // If user forget to fill in one of email or pwd,
    // show the helper text below the textfield
    if (!email || !pwd) {
      setMissEmail(!email);
      setMissPwd(!pwd);
      return;
    }

    try {
      await login(email, pwd);
      localStorage.setItem("email", email);
    } catch (e) {
      // Happen when:
      // 1. email does not exist
      // 2. wrong password
      // (see backend/src/resolvers/Mutation.js - login())
      setMessage({open: true, msg: e.message, type: "error"});
    } finally {
      setEmail("");
      setPwd("");
      setShowPwd(false);
    }
  }

  return (
    <Dialog
      open={visible}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullWidth={true}
      maxWidth={"xs"}
    >
      {/* Mountain icon */}
      <StyledDialogContent>
        <LandscapeRoundedIcon color="success" sx={{ fontSize: 60 }} />
      </StyledDialogContent>
      {/* Just a line */}
      <Divider variant="middle" />

      <StyledDialogContent sx={{ mt: "2em" }}>
        {/* Email */}
        <TextField
          label="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setMissEmail(false);
          }}
          error={missEmail && !email}
          helperText={missEmail ? "請填入電子郵件" : " "}
          sx={{ width: "75%" }}
        />
        {/* Password */}
        <TextField
          label="Password"
          value={pwd}
          onChange={(e) => {
            setPwd(e.target.value);
            setMissPwd(false);
          }}
          error={missPwd && !pwd}
          helperText={missPwd ? "請填入密碼" : " "}
          type={showPwd ? 'text' : 'password'}
          InputProps={{
            endAdornment:
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => { setShowPwd(!showPwd) }}
                  onMouseDown={(e) => { e.preventDefault() }}
                >
                  {showPwd ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>,
          }}
          sx={{ mt: "1em", mb: "1em", width: "75%" }}
        />
        {/* Button */}
        <StyledStack direction="row">
          <Button
            variant="contained"
            onClick={handleClickSignup}
            sx={{ width: "45%", textTransform: "none" }}
          >
            註冊
          </Button>
          <Button
            variant="contained"
            onClick={handlelogin}
            sx={{
              width: "45%", textTransform: "none",
              backgroundColor: "#d81b60",
              '&:hover': { backgroundColor: "#ad1457" },
            }}
            endIcon={<LoginRoundedIcon />}
          >
            登入
          </Button>
        </StyledStack>
      </StyledDialogContent>
    </Dialog>
  );
};

export default LogInModal;