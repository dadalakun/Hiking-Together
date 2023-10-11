import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

const StepThree = ({ draft, setDraft, t }) => {
    return (
        <DialogContent>
            <Typography variant="h5">{t("contact_info_and_note")}</Typography>
            <TextField
                value={draft.otherInfo}
                onChange={(e) => setDraft({ ...draft, otherInfo: e.target.value })}
                multiline
                rows={11}
                placeholder={t("note_placeholder")}
                InputProps={{ style: { fontSize: 16 } }}
                InputLabelProps={{ shrink: true }}
                sx={{ width: "90%", marginLeft: "1em", marginTop: '1em' }}
            />
        </DialogContent>
    );
};

export default StepThree;