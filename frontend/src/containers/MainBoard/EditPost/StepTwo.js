import moment from "moment";

import DialogContent from '@mui/material/DialogContent';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'; 
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';

const StepTwo = ({ draft, setDraft, t }) => {
    return (
        <DialogContent>
            <Typography variant="h5">{t("time")}</Typography>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <FormControl sx={{ width: "20ch", my: "1em", mx: 2 }}>
                    <DesktopDatePicker
                        label={t("label_startDate")}
                        value={draft.startTime}
                        onChange={(v) => setDraft({ ...draft, startTime: v })}
                        minDate={new moment()}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </FormControl>
                <FormControl sx={{ width: "20ch", my: "1em", mx: 2 }}>
                    <DesktopDatePicker
                        label={t("label_endDate")}
                        value={draft.startTime.isAfter(draft.endTime) ?
                            draft.startTime : 
                            draft.endTime}
                        onChange={(v) => setDraft({ ...draft, endTime: v })}
                        minDate={draft.startTime}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </FormControl>
            </LocalizationProvider>
            <Typography variant="h5">{t("trip_detail")}</Typography>
            <TextField
                value={draft.detail}
                onChange={(e) => setDraft({ ...draft, detail: e.target.value })}
                multiline
                rows={11}
                placeholder={t("detail_placeholder")}
                InputProps={{ style: { fontSize: 16 } }}
                InputLabelProps={{ shrink: true }}
                sx={{ width: "90%", marginLeft: "1em", marginTop: '1em' }}
            />
        </DialogContent>
    );
};

export default StepTwo;