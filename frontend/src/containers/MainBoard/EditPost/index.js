import { forwardRef, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Divider from '@mui/material/Divider';

import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditPostModals = ({ visible, handleClose, draft, setDraft, handleSubmit }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [missTitle, setMissTitle] = useState(false);

    useEffect(() => {
        setActiveStep(0);
    }, [visible]);

    const handleNext = () => {
        if (!draft.title) {
            setMissTitle(true);
            return;
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const steps = [
        <StepOne
            draft={draft} setDraft={setDraft}
            missTitle={missTitle} setMissTitle={setMissTitle}
        />,
        <StepTwo
            draft={draft} setDraft={setDraft}
        />,
        <StepThree
            draft={draft} setDraft={setDraft}
        />,
    ];

    const stepLabel = [
        "名稱 & 人數",
        "時間 & 細節",
        "聯絡 & 備註",
    ];

    return (
        <Dialog
            open={visible}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            fullWidth={true}
            maxWidth={"sm"}
        >
            <Box sx={{ m: '2em' }}>
                <Stepper activeStep={activeStep}>
                    {stepLabel.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            <Divider variant="middle" />
            {steps[activeStep]}
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={(activeStep === 0) ? handleClose : handleBack}
                    sx={{  textTransform: "none" }}
                >
                    {(activeStep === 0) ? "取消" : "上一步"}
                </Button>
                <Button
                    variant="contained"
                    onClick={(activeStep === 2) ? handleSubmit : handleNext}
                    sx={{
                        textTransform: "none",
                        backgroundColor: (activeStep === 2) ? "#d81b60" : null,
                        '&:hover': { backgroundColor: (activeStep === 2) ? "#ad1457" : null}
                    }}
                >
                    {(activeStep === 2) ? "送出" : "下一步"}
                </Button>
            </DialogActions>
        </ Dialog>
    );
};

export default EditPostModals;