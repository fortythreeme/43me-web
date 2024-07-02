'use client';
import React, { useState } from 'react';
import {
  FormControlLabel,
  RadioGroup,
  FormControl,
  Switch,
  DialogActions,
  Button,
} from '@mui/material';
import Slider from '@mui/material/Slider';
import {
  Grid,
  Box,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Divider,
} from '@mui/material';
import moment from 'moment';
import CustomRadio from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomRadio';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { IconChevronDown } from '@tabler/icons-react';
import { AddNewTask } from '@/utils/apiCalls';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RemoveTask } from '@/utils/apiCalls';
import AlertCart from '../../apps/ecommerce/productCart/AlertCart';
import { Dialog, DialogContent, TextField } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
const Sure = ({ onClose, open ,item,onTaskMove}) => {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const [text,setText]= useState('')
  const [textsev,setTextSev]= useState('')
  const [textShow,setTextShow]= useState(false) 
  const handleRemove = async () => {
    try {
        const response = await RemoveTask(user?.currentUser?.token, item);
        console.log(response,'res')
      if (response.message === "Task deleted successfully.") {
        console.log(response,'response')
        // setEdit(false);
        onClose();
        onTaskMove(item)
        alert('Deleted Successfully!')   
        setTextShow(true);
        setText('Deleted Successfully!')
        setTextSev('success')
        // onTaskEdit({ ...item, description: desc });
      }
    } catch (err) {
      onClose();
      console.log(err);
    }
  };
  return (
    <>
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Typography variant="h5" mb={2} fontWeight={700}>
Are you sure you want to delete this task?        </Typography>
     
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary1">
          CANCEL
        </Button>
        <Button
          
          color="primary1"
          onClick={handleRemove}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
    <AlertCart open={textShow} text={text} sev={textsev}/></>
  );
};

export default Sure;
{/* <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Share</MenuItem>
        <MenuItem onClick={setDel(true)}>Delete</MenuItem>
        {/* <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu> */}