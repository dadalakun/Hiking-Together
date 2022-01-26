import moment from "moment";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';

const Post = ({ isLogIn, post, setLabel, handleOpenDetail }) => {
    return (
        <Card
            sx={{ minHeight: "16em" }}
        >
            <CardActionArea
                component="a"
                onClick={() => { handleOpenDetail() }}
            >
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[400] }} aria-label="recipe">
                            {post.author[0]}
                        </Avatar>
                    }
                    action={
                        // Only appears after user login
                        isLogIn ?
                            <IconButton
                                aria-label="set-label"
                                onMouseDown={(e) => { e.stopPropagation() }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    setLabel();
                                }}
                            >
                                <BookmarkOutlinedIcon sx={{ fontSize: 30 }} color={post.label ? "primary" : "disabled"} />
                            </IconButton>
                            : <></>
                    }
                    title={post.author}
                    subheader={"發布於: " + moment(post.postTime).format("YYYY-MM-DD h:mm")}
                    sx={{ pb: 0 }}
                />
                <CardContent >
                    <Typography variant="h5" component="div" gutterBottom>
                        {post.title}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ minHeight: "3ch" }} >
                        {post.genre.map((e, idx) => (
                            <Chip
                                color="primary" size="small" variant="outlined"
                                label={e} key={`chip_${idx}`}
                            />
                        ))}
                    </Stack>
                    <Typography sx={{ fontSize: 14, mt: 1 }} color="text.secondary">
                        {"出發 " + moment(post.startTime).format("YYYY-MM-DD")}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {"結束 " + moment(post.endTime).format("YYYY-MM-DD")}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {`徵求 ${post.peopleWant} 人`}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default Post;