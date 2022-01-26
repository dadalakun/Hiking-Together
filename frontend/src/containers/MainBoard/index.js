import { useState } from "react"
import styled from "styled-components";
import moment from "moment";

import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import HikingIcon from '@mui/icons-material/Hiking';
import LabelIcon from '@mui/icons-material/Label';
import FaceIcon from '@mui/icons-material/Face';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import EditPostModals from './EditPost'
import PostDetail from './PostDetail';
import SearchBlock from './SearchBlock';
import EditDial from '../../components/EditDial';
import Post from '../../components/Post';

import useDraft from '../../hooks/useDraft';

const Wrapper = styled.div`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 95%;
  display: flex;
`;

const StyledPaper = styled(Paper)`
  width: 99%;
  height: 95%;
  padding: 1em;
  overflow: hidden;
`;

const StyledBox = styled(Box)`
  display: flex;
  height: 90%;
  align-items: start;
  justify-content: center;
  margin: auto;
  padding: 1em;
  overflow: auto;
`;

const ToolBar = styled(Box)`
  display: flex;
  justify-content: space-between
`;

// action type of submit
const UPDATE = "update";
const CREATE = "create";

// Tab's value
const ALL = "all";
const LABEL = "label";
const MY = "my";

const MainBoard = ({ isLogIn, user, posts, setLabel, removePost, refetch, searchPost, setMessage }) => {
    const [tab, setTab] = useState(ALL);
    const [openpostidx, setOpenpostidx] = useState(null);
    const [EditPostModalVisible, setEditPostModalVisible] = useState(false);
    const [PostDetailVisible, setPostDetailVisible] = useState(false);
    const [editfunc, setEditfunc] = useState(CREATE);
    const {
        draft,
        setDraft,
        createPost,
        updatePost,
        initialize
    } = useDraft(user);

    const handleSwitchTab = (event, newValue) => {
        setTab(newValue);
    };

    // Click the card
    const openDetail = (postindex) => {
        setOpenpostidx(postindex);
        setPostDetailVisible(true);
    };

    const handleRemovePost = async () => {
        try {
            await removePost(openpostidx);
            setOpenpostidx(null);
            refetch();
            setMessage({ open: true, msg: "刪除成功。", type: "success" });
        } catch (e) {
            setMessage({ open: true, msg: e.message, type: "error" });
        }
    }

    // Click "修改行程" at the PostDetail
    const handleClickUpdatePost = () => {
        setEditfunc(UPDATE);
        // Load the post into draft, which I used to submit to the server
        setDraft({
            id: posts[openpostidx].id,
            title: posts[openpostidx].title,
            genre: posts[openpostidx].genre,
            startTime: moment(posts[openpostidx].startTime),
            endTime: moment(posts[openpostidx].endTime),
            peopleOrigin: posts[openpostidx].peopleOrigin,
            peopleWant: posts[openpostidx].peopleWant,
            detail: posts[openpostidx].detail,
            otherInfo: posts[openpostidx].otherInfo
        });
        setEditPostModalVisible(true);
        setOpenpostidx(null);
    }

    const handleSubmit = async () => {
        // Create a completely new post
        if (editfunc === CREATE) {
            try {
                await createPost();
                await refetch({ type: "", query: ""});
                setMessage({ open: true, msg: "發布成功。", type: "success" });
            } catch (e) {
                console.log(e.message);
            } finally {
                setEditPostModalVisible(false);
            }
        } else if (editfunc === UPDATE) {
        // Update the post based on existed data
            try {
                await updatePost();
                setMessage({ open: true, msg: "修改成功。", type: "success" });
            } catch (e) {
                setMessage({ open: true, msg: e.message, type: "error" });
            } finally {
                setEditPostModalVisible(false);
            }
        }
    }

    return (
        <Wrapper>
            <StyledPaper elevation={3}>
                    
                    <ToolBar sx={{ borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs
                          value={tab}
                          onChange={handleSwitchTab}
                          variant="scrollable"
                          scrollButtons="auto"
                        >
                            <Tab icon={<HikingIcon sx={{ fontSize: 20 }} />} label="全部行程" value={ALL} />
                            <Tab icon={<LabelIcon sx={{ fontSize: 20 }} />} label="關注行程" value={LABEL} disabled={!isLogIn} />
                            <Tab icon={<FaceIcon sx={{ fontSize: 20 }} />} label="我的行程" value={MY} disabled={!isLogIn} />
                        </Tabs>
                        {/* Search bar & type selector */}
                        <SearchBlock
                            searchPost={searchPost}
                            setMessage={setMessage}
                            refetch={refetch}
                        />
                    </ToolBar>

                    <StyledBox>
                        <Grid direction="row" container spacing={2}>
                            {posts.map((post, idx) => (
                                // filt the posts based on current tab
                                <Grid display={((tab === LABEL && !post.label) || (tab === MY && !post.myPost))  && "none"}
                                    item lg={3} md={4} sm={6} xs={12} key={"grid" + post.id}
                                >
                                    <Post
                                        isLogIn={isLogIn}
                                        post={post}
                                        setLabel={() => setLabel(post.id, idx)}
                                        handleOpenDetail={() => openDetail(idx)}
                                        key={"post" + post.id}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </StyledBox>
                {/* A three-step form used to submit the draft to the server */}
                <EditPostModals
                    visible={EditPostModalVisible}
                    handleClose={() => setEditPostModalVisible(false)}
                    draft={draft}
                    setDraft={setDraft}
                    handleSubmit={handleSubmit}
                />
                {/* showing the detail of the Post after clicking the card */}
                <PostDetail
                    visible={PostDetailVisible}
                    handleClose={() => setPostDetailVisible(false)}
                    post={posts[openpostidx]}
                    removePost={handleRemovePost}
                    updatePost={handleClickUpdatePost}
                />
                {/* Only appears when after user login */}
                <EditDial
                    isLogIn={isLogIn}
                    clickNewPost={() => {
                        initialize();
                        setEditPostModalVisible(true);
                        setEditfunc(CREATE);
                    }}
                />
            </StyledPaper>
        </Wrapper>
    );
};

export default MainBoard;