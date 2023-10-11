import moment from "moment";
import { forwardRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Zoom from '@mui/material/Zoom';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Transition = forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
});

const PostDetail = ({ visible, handleClose, removePost, updatePost, t,
    post = {
        id: "", title: "", genre: [], startTime: "", endTime: "",
        peopleOrigin: 0, peopleWant: 0, detail: "", otherInfo: "",
        author: "", myPost: false
    } }) => {

    return (
        <Dialog
            open={visible}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            fullWidth={true}
            maxWidth={"sm"}
        >
            <DialogTitle sx={{ textAlign: "center", fontSize: 30, my: 1 }}>{post.title}</DialogTitle>
            <DialogContent sx={{ overflow: "hidden" }}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="h6">{(post.genre.length > 0) ? t("tags") + " : " : " "}</Typography>
                    {post.genre.map((e, idx) => (
                        <Chip
                            color="primary" size="small" variant="outlined"
                            label={e} key={`genre_chip_${idx}`}
                        />
                    ))}
                </Stack>
            </DialogContent>
            <DialogContent sx={{ overflow: "hidden" }} dividers>
                <Typography variant="h6">
                    { t("time") + " : " + moment(post.startTime).format("YYYY-MM-DD")
                        + " ~ " + moment(post.endTime).format("YYYY-MM-DD")}
                </Typography>
                <Typography variant="h6">
                    { t("label_people_have") + " : " + post.peopleOrigin + " 人 / " +
                        t("label_people_need") + " : " + post.peopleWant + " 人"}
                </Typography>
            </DialogContent>
            <DialogContent sx={{ maxHeight: "330px", overflow: "auto" }}>
                <Typography variant="h5" gutterBottom>{t("trip_detail")}</Typography>
                <Box sx={{ mt: 2, mb: 2 }}>
                    <Typography variant="h6" sx={{ whiteSpace: 'pre-line' }}>{post.detail}</Typography>
                </Box>
                <Divider variant="middle" />
                <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>{t("progress_contact_note")}</Typography>
                <Box sx={{ mt: 2, mb: 2 }}>
                    <Typography variant="h6" sx={{ whiteSpace: 'pre-line' }}>{post.otherInfo}</Typography>
                </Box>
            </DialogContent>
            <DialogContent dividers>
                <Stack direction="row" spacing={5} justifyContent="center" alignItems="center" >
                    <Button
                      variant="contained"
                      startIcon={<DeleteIcon />}
                      color="error"
                      onClick={() => {
                        handleClose();
                        removePost();
                      }}
                      sx={{ display: (post.myPost) ? '' : 'none' }}
                    >
                        {t("remove_trip_button")}
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<EditIcon />}
                      onClick={() => {
                        handleClose();
                        updatePost();
                      }}
                      sx={{ display: (post.myPost) ? '' : 'none' }}
                    >
                        {t("modify_trip_button")}
                    </Button>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default PostDetail;