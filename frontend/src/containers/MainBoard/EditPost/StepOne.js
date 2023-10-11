import styled from "styled-components";
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import SelectGenre from '../../../components/SelectGenre'

const StyledStack = styled(Stack)`
  justify-content: flex-start;
  width: 75%;
  margin-top: 1em;
  margin-left: 1em;
`;

const StepOne = ({ draft, setDraft, missTitle, setMissTitle, t }) => {

    return (
        <DialogContent>
            <Typography variant="h5">{t("trip_name")}</Typography>
            <TextField
                placeholder={t("trip_name_placeholder")}
                value={draft.title}
                onChange={(e) => {
                    setMissTitle(false);
                    setDraft({ ...draft, title: e.target.value });
                }}
                error={missTitle && !draft.title}
                helperText={missTitle ? t("helpertext_enter_trip_name") : " "}
                sx={{ mt: "1em", ml: "1em" }}
            />
            <Typography variant="h5">{t("tags")}</Typography>
            <Box
                sx={{ mt: "1em", ml: "1em", minHeight: "5em" }}
            >
                <SelectGenre draft={draft} setDraft={setDraft} t={t} />
            </Box>
            <Typography variant="h5">{t("headcount") + " ? (*)"}</Typography>
            <StyledStack direction="row">
                <FormControl sx={{ width: '10ch', mr: '3em' }}>
                    <InputLabel>{t("label_people_have")}</InputLabel>
                    <Select
                        value={draft.peopleOrigin}
                        label={t("label_people_have")}
                        onChange={(e) => setDraft({ ...draft, peopleOrigin: e.target.value })}
                    >
                        {
                            Array.from(Array(9).keys()).map((i) => (
                                <MenuItem value={i + 1} key={"origin_" + (i + 1)}>{i + 1}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <FormControl sx={{ width: '10ch' }}>
                    <InputLabel>{t("label_people_need")}</InputLabel>
                    <Select
                        value={draft.peopleWant}
                        label={t("label_people_need")}
                        onChange={(e) => setDraft({ ...draft, peopleWant: e.target.value })}
                    >
                        {
                            Array.from(Array(9).keys()).map((i) => (
                                <MenuItem value={i + 1} key={"origin_" + (i + 1)}>{i + 1}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </StyledStack>
        </DialogContent>
    );
};

export default StepOne;