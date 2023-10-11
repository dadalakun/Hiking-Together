import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/react-hooks';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LandscapeIcon from '@mui/icons-material/Landscape';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';

import {
    TEST_TOKEN_MUTATION,
} from '../graphql';

const Bar = ({ isLogIn, user, handleClickOpen, logout }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [testToken] = useMutation(TEST_TOKEN_MUTATION);
    const { t } = useTranslation();

    useEffect(() => {
        setAnchorEl(null);
    }, [isLogIn]);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Click the icon on the left-top corner of the page
    const handleTestClick = async () => {
        try {
            const { data } = await testToken();
            console.log(data);
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ ml: 0 }}
                        onClick={handleTestClick}
                    >
                        <LandscapeIcon sx={{ fontSize: 40 }} />
                    </IconButton>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1, textAlign: "right" }} />
                    {isLogIn ?
                        <>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <Avatar sx={{ bgcolor: red[400] }} aria-label="recipe">
                                    {/* use the first letter of the username to decorate the avatar */}
                                    {user[0]}
                                </Avatar>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={logout}>{t("logout")}</MenuItem>
                            </Menu>
                        </>
                        :
                        <Button
                            color="inherit"
                            size="small"
                            onClick={handleClickOpen}
                            variant="outlined"
                            sx={{ textTransform: "none" }}
                        >
                            {t('login')}
                        </Button>
                    }

                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Bar;