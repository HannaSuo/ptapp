import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCustomer(props) {

    const[customer, setCustomer] = React.useState ({
        firstname: ' ',
        lastname: ' ',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setCustomer({
        firstname: props.data.firstname ,
        lastname: props.data.lastname ,
        streetaddress: props.data.streetaddress ,
        postcode: props.data.postcode ,
        city: props.data.city ,
        email: props.data.email ,
        phone: props.data.phone

    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.updateCustomer(customer, props.data.links[1].href);
    setOpen(false);
  }

  return (
    <div>
      <Button size="small" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit customer</DialogTitle>
        <DialogContent>
        <TextField
            margin="dense"
            label="First name"
            fullWidth
            variant="standard"
            value={customer.firstname}
            onChange={e => setCustomer({...customer, firstname: e.target.value})}
            />
        <TextField
            margin="dense"
            label="Lastname"
            fullWidth
            variant="standard"
            value={customer.lastname}
            onChange={e => setCustomer({...customer, lastname: e.target.value})}
            />
        <TextField
            margin="dense"
            label="Streetaddress"
            fullWidth
            variant="standard"
            value={customer.streetaddress}
            onChange={e => setCustomer({...customer, streetaddress: e.target.value})}
            />
        <TextField
            margin="dense"
            label="Postcode"
            fullWidth
            variant="standard"
            value={customer.postcode}
            onChange={e => setCustomer({...customer, postcode: e.target.value})}
            />
        <TextField
            margin="dense"
            label="City"
            fullWidth
            variant="standard"
            value={customer.city}
            onChange={e => setCustomer({...customer, city: e.target.value})}
            />
        <TextField
            margin="dense"
            label="E-mail"
            fullWidth
            variant="standard"
            value={customer.email}
            onChange={e => setCustomer({...customer, email: e.target.value})}
            />
        <TextField
            margin="dense"
            label="Phone number"
            fullWidth
            variant="standard"
            value={customer.phone}
            onChange={e => setCustomer({...customer, phone: e.target.value})}
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