import * as React from 'react';
import Button from '@mui/material/Button';
import PostAddIcon from '@mui/icons-material/PostAdd';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


export default function AddTraining(props) {

    const [training, setTraining] = React.useState({
        date: ' ',
        duration: '',
        activity: ' ',
        customer: '',
    });

    const [custName, setCustName] = React.useState('');

    const [myDate, setMyDate] = React.useState('');

    const dateTimeSetter = (date) => {
        setMyDate(date)
        try {
            const trainingDate = date.toISOString();
            setTraining({ ...training, date: trainingDate });
        } catch (e) {
            console.error(e);
        }
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setTraining({
            date: '',
            duration: '',
            activity: '',
            customer: props.data.links[0].href
        });
        setCustName(props.data.firstname + ' ' + props.data.lastname);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.saveTraining(training, custName);
        console.log(training);
        setOpen(false);
    }

    return (
        <div>
            <Button variant="contained" size="small" startIcon={<PostAddIcon />} onClick={handleClickOpen}>
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Book a new training</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            label="Task date"
                            value={myDate}
                            onChange={(newMyDate) => {
                                dateTimeSetter(newMyDate);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField
                        margin="dense"
                        label="Activity"
                        fullWidth
                        variant="standard"
                        value={training.activity}
                        onChange={e => setTraining({ ...training, activity: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Duration (min.)"
                        fullWidth
                        variant="standard"
                        value={training.duration}
                        onChange={e => setTraining({ ...training, duration: e.target.value })}
                    />
                    <TextField
                        disabled
                        margin="dense"
                        label="Customer"
                        fullWidth
                        variant="standard"
                        value={custName}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}