import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import TrainingList from './TrainingList';
import CustomerList from './CustomerList';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ListItemIcon from '@mui/material/ListItemIcon';


const options = [
  'Trainings',
  'Customers'
];

export default function MenuBar() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (_, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
        <div>
          <List
            component="nav"
      >
            <ListItem
              button
              id="button"
              aria-haspopup="listbox"
              aria-controls="lock-menu"
              aria-label="Dashboard"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClickListItem}
        >
            <ListItemIcon>
                <MenuRoundedIcon />
            </ListItemIcon>
            <ListItemText
            primary="Menu"
            />
            </ListItem>
            </List>
            <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'lock-button',
              role: 'listbox',
        }}
      >
          {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
        </Menu>
    </div>
    <div>
      {selectedIndex === 0 && <div><TrainingList/></div>}   
      {selectedIndex === 1 && <div><CustomerList/></div>}  
    </div>
  </div>

  );
}