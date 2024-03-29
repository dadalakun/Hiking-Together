import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from "styled-components";

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

/**
 *  Send out searching query and searching type
 */
const SearchBlock = ({ searchPost, setMessage, refetch }) => {
    const [searchBy, setSearchBy] = useState("title");
    const [target, setTarget] = useState("")
    const { t } = useTranslation();

    useEffect(() => {
        // click "all" radio to fetch all posts
        if (searchBy === "all") {
            setTarget("");
            refetch({ type: "", query: ""});
        }
    }, [searchBy, refetch])
    
    // Send searching request 
    const handleSearch = async () => {
        try {
            if (target) {
                await searchPost(searchBy, target);
            } else {
                await searchPost(searchBy, "");
            }
            setMessage({ open: true, msg: "Search completed", type: "success" });
        } catch (e) {
            setMessage({ open: true, msg: e.message, type: "error" });
        }
    };
    const handleChange = (event) => {
        setSearchBy(event.target.value);
    };
    return (
        <>
            <StyledBox>
                <Paper
                    sx={{ mr: "2em", my: "1em", p: "2px 4px", display: "flex", alignItems: "center", width: 200 }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder={t('search_placeholder')}
                        inputProps={{ 'aria-label': 'search bar' }}
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        disabled={searchBy === "all"}
                    />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton disabled={searchBy === "all"} onClick={handleSearch} sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <RadioGroup row aria-label="search" value={searchBy} onChange={handleChange} >
                    <FormControlLabel
                        value="all" control={<Radio color="secondary" />}
                        label={t('all_radio')}
                    />
                    <FormControlLabel
                        value="title" control={<Radio />}
                        label={t('title_radio')}
                    />
                    <FormControlLabel
                        value="tag" control={<Radio />}
                        label={t('tag_radio')}
                    />
                    <FormControlLabel
                        value="author" control={<Radio />}
                        label={t('user_radio')}
                    />
                </RadioGroup>
            </StyledBox>
        </>
    );
};

export default SearchBlock;