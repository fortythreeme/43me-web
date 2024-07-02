'use client';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Chip from '@mui/material/Chip';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CancelIcon from '@mui/icons-material/Cancel';
// import { StripePay } from '@/utils/apiCalls';
import {
  FormControlLabel,
  RadioGroup,
  FormControl,
  Switch,
  DialogActions,
  Button,
} from '@mui/material';
import Slider from '@mui/material/Slider';

import { StripePay,UpdateSubscription,StripeStatus } from '@/utils/apiCalls';
import Loading from '@/app/(DashboardLayout)/loading';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Grid,
  Box,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Divider,
  Input,
} from '@mui/material';
import moment from 'moment';
import CustomRadio from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomRadio';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { IconChevronDown } from '@tabler/icons-react';
import { AddNewTask } from '@/utils/apiCalls';
import { useSelector,useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, TextField } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import AlertCart from '../../apps/ecommerce/productCart/AlertCart';
const NoDaysLeft = ({ onClose, open }) => {
  const router = useRouter();  
  const dispatch = useDispatch()
  const [isloading, setisloading] = React.useState(false);
  const [text,setText]= useState('')
  const [textsev,setTextSev]= useState('')
  const [textShow,setTextShow]= useState(false) 
  const user = useSelector((state) => state.user);
  const [title, setTitle] = useState('');
  const DataImg = new FormData();
  const [value, setValue] = useState('never');
  const [start, setStart] = useState(new Date());
  const [newlyUploadedImages, setNewlyUploadedImages] = useState([]);
  const [tags1, setTags1] = useState([]);
  // console.log(edit,'editing')
  const [newTag, setNewTag] = useState('');
  const [startMonth, setStartMonth] = useState(new Date());
  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };
  let interval
  const [sliderValue, setSliderValue] = useState(1);
  const [monthly, setMonthly] = useState(false);
  const handleChange2 = (event) => {
    setValue(event.target.value);
  };
  const UpdateSub = async (status) => {
    const dat = moment(new Date());
    const next_expiry_date = dat.add(1, 'years').format('YYYY-MM-DD');
    try {
      const data = {
        expiry_date: next_expiry_date,
        plan_identifier: 'me.fortythree.iap.oneyear',
        platform: 'web',
        receipt:JSON.stringify(status)
      };
      const res = await UpdateSubscription(user.currentUser.token,data)
      if(res.success){
           dispatch(setUser({
              ...user.currentUser,
              is_subscribed:res.data.is_subscribed,
              expiry_date:res.data.expiry_date,
              days_left:res.data.days_left,
              plan_title:res.data.plan_title
          }));
          setTextShow(true);
          setText('Subscription Updated Successfully!')
          setTextSev('success')
          // alert("Subscription Updated Successfully!")
          onClose()
        }
        if(res.success===false){
          setTextShow(true);
          setText('Error, Try Again')
          setTextSev('error')
          // alert("Error, Try Again")
        }
        setisloading(false);
        // location.reload()
      console.log(res,'res')
      console.log(user,"user_info")
    } catch (err) {
      console.log(err);
      // alert("Error, Try Again")
      setTextShow(true);
          setText('Error, Try Again')
          setTextSev('error')
      setisloading(false);
    }
  };
  const CheckStatus = async () => {
    let ids = localStorage.getItem('sessionId');
    // console.log(ids, 'ids');
    if (ids) {
      clearInterval(interval);
      try {
        const CheckStatus = await StripeStatus(ids);
        console.log(CheckStatus, 'check');
        if (CheckStatus.success) {
          if (
            CheckStatus.data.status.payment_status === 'paid' &&
            CheckStatus.data.status.status === 'complete'
          )
            console.log(true);
            UpdateSub(CheckStatus.data.status)
          //   dispatch(setUser({
          //     ...user.currentUser,
          //     is_subscribed:CheckStatus.data.is_subscribed,
          //     expiry_date:CheckStatus.data.expiry_date,
          //     days_left:CheckStatus.data.days_left,
          //     plan_title:CheckStatus.data.plan_title
          // }));
        }
        else{
          alert('Transaction Failed!')
        }
      } catch (error) {
        console.error('Error fetching Stripe status:', error);
      }
    }
  };
  const handleAddTask = async () => {

    try {
      const response = await StripePay();
      if (response.data && response.data.data.CheckoutUrl) {
        // Open the CheckoutUrl in a new tab
        localStorage.removeItem('sessionId');
        window.open(response.data.data.CheckoutUrl, '_blank');
        setisloading(true);
        interval = setInterval(CheckStatus, 5000);

    }
      console.log(response)
    } catch (err) {
      onClose();
      console.log(err);
      setisloading(false)
    }
  };

 
  return (
    <> 
    {isloading && (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          position: 'fixed',
          top: '0',
          left: '0',
          height: '100vh',
          zIndex: '2000',
          background: '#cccccc57',
        }}
      >
        <CircularProgress />
      </Box>
    )}
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Typography variant="h2" mb={2} fontWeight={700}>
          No Days Left 
        </Typography>
        <Typography variant='h5'>Your Subscription Plan has ended.
          <br/>
          To continue 43me click the Payment Button.</Typography>
      </DialogContent>
      <DialogActions>
        <Button
        
          // onClick={(e) => {
          //   e.preventDefault();
          //   dispatch(addNote(id, title, scolor));
          //   setOpen(false);
          //   setTitle('');
          // }}
          className='payment'
          color="primary1"
          onClick={handleAddTask}
        >
          Payment
        </Button>
      </DialogActions>
    </Dialog>
    <AlertCart open={textShow} text={text} sev={textsev}/>
    </>
  );
};

export default NoDaysLeft;
