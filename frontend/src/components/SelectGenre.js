import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    '百岳',
    '郊山',
    '中級山',
    '探勘路線',
    '縱走',
    '單攻',
    '健行',
    '揪人',
    '同行',
    '共乘',
    '包車',
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const SelectGenre = ({ draft, setDraft }) => {
    const theme = useTheme();

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setDraft({...draft, genre: typeof value === 'string' ? value.split(',') : value });
    };

    return (
        <>
            <Select
                multiple
                value={draft.genre}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
                sx={{ width: "40%" }}
            >
                {names.map((name) => (
                    <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, draft.genre, theme)}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </>
    );
};

export default SelectGenre;