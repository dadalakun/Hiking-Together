import { forwardRef, useState } from 'react';
import styled from "styled-components";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

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

const SignUpModal = ({ visible, handleClose, handlePrev, signup, setMessage }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [missName, setMissName] = useState(false);
    const [missEmail, setMissEmail] = useState(false);
    const [missPwd, setMissPwd] = useState(false);

    const handleSignup = async () => {
        // If the signup information not provided 
        if (!name || !email || !pwd) {
            setMissName(!name);
            setMissEmail(!email);
            setMissPwd(!pwd);
            return;
        }
        try {
            await signup(name, email, pwd);
            setMessage({ open: true, msg: "註冊成功", type: "success" });
            localStorage.setItem("email", email);
            handlePrev();
        } catch (e) {
            // Happen when:
            // 1. user exists
            // 2. email has been registered
            // (see backend/src/resolvers/Mutation.js - signup())
            setMessage({ open: true, msg: e.message, type: "error" })
        } finally {
            setName("");
            setEmail("");
            setPwd("");
        }
    }

    return (
        <Dialog
            open={visible}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            fullWidth={true}
            maxWidth="xs"
        >
            {/* User icon */}
            <StyledDialogContent>
                <AccountCircleOutlinedIcon color="info" sx={{ fontSize: 60 }} />
            </StyledDialogContent>
            {/* Simple line */}
            <Divider variant="middle" />

            <StyledDialogContent sx={{ mt: "1em" }}>
                {/* Name */}
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setMissName(false);
                    }}
                    error={missName && !name}
                    helperText={missName ? "請填入用戶名稱" : " "}
                    sx={{ mb: "1em", width: "75%" }}
                />
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
                    sx={{ mb: "1em", width: "75%" }}
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
                    helperText={missPwd ? "請填入用戶密碼" : " "}
                    sx={{ mb: "1em", width: "75%" }}
                />

                {/* Button */}
                <StyledStack direction="row">
                    <Button
                        variant="contained"
                        onClick={handlePrev}
                        sx={{ width: "45%", textTransform: "none" }}
                        startIcon={<KeyboardBackspaceIcon />}
                    >
                        登入
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSignup}
                        sx={{
                            width: "45%", textTransform: "none",
                            backgroundColor: "#d81b60",
                            '&:hover': { backgroundColor: "#ad1457" },
                        }}
                    >
                        註冊
                    </Button>
                </StyledStack>
            </StyledDialogContent>
        </Dialog>
    );
};

export default SignUpModal;