import moment from "moment";

import DialogContent from '@mui/material/DialogContent';
import AdapterMoment from "@mui/lab/AdapterMoment";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';

const DETAIL_PLACEHOLDER =
    "範例 :" + "\n" + 
    "Day0" + "\n" + 
    "台北出發 >> 住合歡山滑雪山莊" + "\n\n" +
    "Day1" + "\n" +
    "8:00 奇萊登山口出發 >> 奇萊稜線山屋 >>" + "\n" +
    "輕裝上北峰 >> 住稜線山屋" + "\n\n" +
    "Day2" + "\n" +
    "4:00 出發往主峰看日出 >> 回稜線山屋拿背包 >>" + "\n" +
    "15:00 左右回登山口 >> 埔里吃飯回台北";

const StepTwo = ({ draft, setDraft }) => {
    return (
        <DialogContent>
            <Typography variant="h5">時間</Typography>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <FormControl sx={{ width: "20ch", my: "1em", mx: 2 }}>
                    <DesktopDatePicker
                        label="出發日期"
                        value={draft.startTime}
                        onChange={(v) => setDraft({ ...draft, startTime: v })}
                        minDate={new moment()}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </FormControl>
                <FormControl sx={{ width: "20ch", my: "1em", mx: 2 }}>
                    <DesktopDatePicker
                        label="結束日期"
                        value={draft.startTime.isAfter(draft.endTime) ?
                            draft.startTime : 
                            draft.endTime}
                        onChange={(v) => setDraft({ ...draft, endTime: v })}
                        minDate={draft.startTime}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </FormControl>
            </LocalizationProvider>
            <Typography variant="h5">行程細節</Typography>
            <TextField
                value={draft.detail}
                onChange={(e) => setDraft({ ...draft, detail: e.target.value })}
                multiline
                rows={11}
                placeholder={DETAIL_PLACEHOLDER}
                InputProps={{ style: { fontSize: 16 } }}
                InputLabelProps={{ shrink: true }}
                sx={{ width: "90%", marginLeft: "1em", marginTop: '1em' }}
            />
        </DialogContent>
    );
};

export default StepTwo;