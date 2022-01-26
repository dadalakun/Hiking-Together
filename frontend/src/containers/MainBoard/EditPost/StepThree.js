import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

const OTHERINFO_PLACEHOLDER =
    "範例 :" + "\n" + 
    "從台北出發經過埔里上合歡山，沿途高速公路附近可以順便撿，" +
    "油錢隨意付，有興趣的山友可以透過下面方式找到我 :" + "\n\n" +
    "Line: xxxxxxxx" + "\n" +
    "臉書名稱: 母咪人" + "\n";
    

const StepThree = ({ draft, setDraft }) => {
    return (
        <DialogContent>
            <Typography variant="h5">{"其他聯絡事項 & 備註"}</Typography>
            <TextField
                value={draft.otherInfo}
                onChange={(e) => setDraft({ ...draft, otherInfo: e.target.value })}
                multiline
                rows={11}
                placeholder={OTHERINFO_PLACEHOLDER}
                InputProps={{ style: { fontSize: 16 } }}
                InputLabelProps={{ shrink: true }}
                sx={{ width: "90%", marginLeft: "1em", marginTop: '1em' }}
            />
        </DialogContent>
    );
};

export default StepThree;