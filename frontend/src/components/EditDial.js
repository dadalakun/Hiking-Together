import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';



const EditDial = ({ isLogIn, clickNewPost }) => {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    const actions = [
        { icon: <CreateTwoToneIcon />, name: t("new_trip") }
    ];
    
    const handleOpen = (e) => {
        if(e.type  === "mouseenter") {
            setOpen(true);
        }
    }
    return (
        <SpeedDial
            open={open}
            hidden={!isLogIn}
            onClose={() => setOpen(false)}
            onOpen={handleOpen}
            ariaLabel="EditDial"       
            icon={<SpeedDialIcon />}
            sx={{ position: 'absolute', bottom: '3em', right: '4em' }}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    tooltipOpen
                    onClick={clickNewPost}
                />
            ))}
        </SpeedDial>
    );
};

export default EditDial;