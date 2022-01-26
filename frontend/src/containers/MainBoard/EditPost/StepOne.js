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

const StepOne = ({ draft, setDraft, missTitle, setMissTitle }) => {

    return (
        <DialogContent>
            <Typography variant="h5">行程名稱</Typography>
            <TextField
                placeholder="例 : 奇萊主北"
                value={draft.title}
                onChange={(e) => {
                    setMissTitle(false);
                    setDraft({ ...draft, title: e.target.value });
                }}
                error={missTitle && !draft.title}
                helperText={missTitle ? "請填入行程名稱" : " "}
                sx={{ mt: "1em", ml: "1em" }}
            />
            <Typography variant="h5">類型標籤(非必填)</Typography>
            <Box
                sx={{ mt: "1em", ml: "1em", minHeight: "5em" }}
            >
                <SelectGenre draft={draft} setDraft={setDraft} />
            </Box>
            <Typography variant="h5">人數</Typography>
            <StyledStack direction="row">
                <FormControl sx={{ width: '10ch', mr: '3em' }}>
                    <InputLabel>內建</InputLabel>
                    <Select
                        value={draft.peopleOrigin}
                        label="內建"
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
                    <InputLabel>尚缺</InputLabel>
                    <Select
                        value={draft.peopleWant}
                        label="尚缺"
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