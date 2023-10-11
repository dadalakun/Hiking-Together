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

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const SelectGenre = ({ draft, setDraft, t }) => {
    const theme = useTheme();
    const names = [
        t("tag_3000m_plus"),
        t("tag_1500m_plus"),
        t("tag_500m_plus"),
        t("tag_advanture"),
        t("tag_several_days"),
        t("tag_one_day"),
        t("tag_hiking"),
        t("tag_climb"),
        t("tag_freeload"),
        t("tag_charter")
    ];

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