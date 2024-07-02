import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  FormControlLabel,
  Switch,
  Divider,
  Button,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { FormLabel, RadioGroup, Radio } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent, TextField } from '@mui/material';
import * as dropdownData from '../../layout/vertical/header/data';
import Link from 'next/link';
import { setUser } from '@/store/user/userSlice';
import { Stack } from '@mui/system';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useRouter } from 'next/navigation';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import timezones from '../../../../utils/timezones.json';
import Avatar from '@mui/material/Avatar';
import moment from 'moment';
import { Update } from '@/utils/apiCalls';
import CustomTextField from '../forms/theme-elements/CustomTextField';
import AlertCart from './ecommerce/productCart/AlertCart';
const SecondSet = () => {
  const user = useSelector((state) => state.user);
  // console.log(user);
  const defaultTime = moment().set({ hour: 8, minute: 0, second: 0, millisecond: 0 });
  const defaultTime1 = moment().set({ hour: 13, minute: 0, second: 0, millisecond: 0 });
  const defaultTime2 = moment().set({ hour: 17, minute: 0, second: 0, millisecond: 0 });
  const dispatch = useDispatch();
  let form = localStorage.getItem('format')
  const [selectedFormat, setSelectedFormat] = useState(form);

  const handleFormatChange = (event) => {
    setSelectedFormat(event.target.value);
    setFormD(true)
    
  };
   const getInitialMidValue = () => {
    const storedMid = localStorage.getItem('mid');
    return storedMid ? new Date(storedMid) : defaultTime1.toDate();
  };
  const getInitialMorValue = () => {
    const storedMid = localStorage.getItem('mor');
    return storedMid ? new Date(storedMid) : defaultTime.toDate();
  };
  const getInitialEveValue = () => {
    const storedMid = localStorage.getItem('eve');
    return storedMid ? new Date(storedMid) : defaultTime2.toDate();
  };
  const router = useRouter();
  const isMorning= localStorage.getItem('morRemind')
  const isEvening= localStorage.getItem('eveRemind')
  const isMidday= localStorage.getItem('midRemind')
  const [value2, setValue2] = React.useState(getInitialMorValue);
  const [valuemid, setValuemid] = React.useState(getInitialMidValue);
  const [valueeve, setValueeve] = React.useState(getInitialEveValue);
  const [morningRemind, setMorningRemind] = useState(false);
  const [value, setValue] = useState(user?.currentUser.user.timezone);
  const [morning, setMorning] = useState(isMorning==='true');
  const [formD, setFormD] = useState(false);
  const [mid, setMid] = useState(isMidday==='true');
  const [evening, setEvening] = useState(isEvening==='true');
  const [text,setText]= useState('')
  const [textsev,setTextSev]= useState('')
  const [textShow,setTextShow]= useState(false) 
  const handleChange = (val) => {
    setValue(val);
    setMorningRemind(true);
    // const {first_name, last_name, email, mobile_no} = userInfo;
    // const updProfile = {
    //   firstname: first_name,
    //   lastname: last_name,
    //   email,
    //   mobile: mobile_no,
    //   timezone: val,
    // };
    // updateProfile(updProfile, () => {
    //   getList();
    // });
    // console.log('updProfile-->', updProfile);
  };
  const dateFormats = [
    { title: 'DD.MM.' },
    { title: 'MM/DD' },
    { title: 'DD/MM' },
    { title: 'DD' },
  ];
  const handleSubmit = async () => {
    try {
      console.log("fv")
      if (mid) {
        localStorage.setItem('mid', valuemid);
        localStorage.setItem('midRemind', mid);
      }
      if (evening) {
        localStorage.setItem('eve', valueeve);
        localStorage.setItem('eveRemind', evening);
      }
      if (morning) {
        localStorage.setItem('mor', value2);
        localStorage.setItem('morRemind', morning);
      }
      if (!mid) {
        localStorage.removeItem('mid');
        localStorage.setItem('midRemind', mid);
      }
      if (!evening) {
        localStorage.removeItem('eve');
        localStorage.setItem('eveRemind', evening);
      }
      if (!morning) {
        localStorage.removeItem('mor');
        localStorage.setItem('morRemind', morning);
      }
      if(formD){
        localStorage.setItem('format',selectedFormat)
      }
      if (morningRemind === true) {
        const params = {
          id: user?.currentUser?.user._id,
          first_name: user?.currentUser?.user.first_name,
          last_name: user?.currentUser?.user.last_name,
          email: user?.currentUser?.user.email,
          mobile_no: user?.currentUser?.user.mobile_no,
          timezone: value,
        };
        // console.log(params,'params')
        const response = await Update(user?.currentUser?.token, params);
        // console.log(response, 'response');
        dispatch(
          setUser({
            ...user.currentUser,
            user: {
              ...user.currentUser.user,
              first_name: user?.currentUser?.user.first_name,
              last_name: user?.currentUser?.user.last_name,
              email: user?.currentUser?.user.email,
              mobile_no: user?.currentUser?.user.mobile_no,
              timezone: value,
            },
          }),
        );
      }
      setTextShow(true);
      setText('UPDATED SUCCESSFULLY!')
      setTextSev('success')
      // alert('UPDATED SUCCESSFULLY!');
      location.reload();
      // router.push('/');
    } catch (err) {
      console.log(err);
    }
  };
  const onClose = () => {
    router.push('/');
  };
  console.log(morningRemind, 'morning');
  return (
    <>
    <Box style={{ marginLeft: '25px', width: '100%' }}>
      <Typography variant="h6" style={{ margin: '20px auto' }}>
        TIMEZONE
      </Typography>
      <Box>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Timezone</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              label="Timezone"
              onChange={(event) => handleChange(event.target.value)}
            >
              {Object.entries(timezones).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {timezones[key]}
                </MenuItem>
              ))}
              {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Typography variant="h6" style={{ margin: '20px auto' }}>
        REMINDERS
      </Typography>
      <FormControlLabel
        value="start"
        control={
          <Switch color="primary" onChange={(e) => setMorning(e.target.checked)}
          className="swit"
          checked={morning} />
        }
        label="Morning reminder"
        labelPlacement="start"
        className="reminders"
      />

      {/* <Divider /> */}
      {/* <LocalizationProvider dateAdapter={AdapterMoment}>
  <TimePicker defaultValue={morningRemind} onChange={handleStartMorning} renderInput={(params) => (
                    <TextField {...params} fullWidth sx={{ mb: 2, mt: 2 }} />
                  )} />
</LocalizationProvider> */}
      {morning && (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            value={value2}
            onChange={(newValue) => {
              setValue2(newValue);
            }}
            renderInput={(params) => (
              <CustomTextField
                size="small"
                {...params}
                fullWidth
                sx={{
                  '& .MuiSvgIcon-root': {
                    width: '18px',
                    height: '18px',
                  },
                  '& .MuiFormHelperText-root': {
                    display: 'none',
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>
      )}
      <Divider />
      <FormControlLabel
        value="start"
        control={
          <Switch color="primary" onChange={(e) => setMid(e.target.checked)}
          className="swit"
          checked={mid}
        />
        }
        label="Mid Day reminder"
        className="reminders"
        labelPlacement="start"
      />
      {mid && (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            value={valuemid}
            onChange={(newValue) => {
              setValuemid(newValue);
            }}
            renderInput={(params) => (
              <CustomTextField
                size="small"
                {...params}
                fullWidth
                sx={{
                  '& .MuiSvgIcon-root': {
                    width: '18px',
                    height: '18px',
                  },
                  '& .MuiFormHelperText-root': {
                    display: 'none',
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>
      )}
      <Divider />
      <FormControlLabel
        value="start"
        control={
          <Switch color="primary" onChange={(e) => setEvening(e.target.checked)}
          className="swit"
          checked={evening}
        />
        }
        label="Evening reminder"
        className="reminders"
        labelPlacement="start"
      />
      {evening && (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            value={valueeve}
            onChange={(newValue) => {
              setValueeve(newValue);
            }}
            renderInput={(params) => (
              <CustomTextField
                size="small"
                {...params}
                fullWidth
                sx={{
                  '& .MuiSvgIcon-root': {
                    width: '18px',
                    height: '18px',
                  },
                  '& .MuiFormHelperText-root': {
                    display: 'none',
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>
      )}
      <Divider />
      <Box>
        <Typography variant="h6" style={{ margin: '20px auto' }}>
          DATE FORMAT
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="dateFormats"
            name="dateFormats"
            value={selectedFormat}
            onChange={handleFormatChange}
            className='radioDate'
          >
            {dateFormats.map((format, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  value={format.title}
                  control={<Radio style={{ display: 'none' }} />}
                  label={format.title}
                  onChange={handleFormatChange}
                  />
                  {selectedFormat === format.title && <CheckIcon />}
              </div>
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
      <Box>
        <Button onClick={onClose} color="primary1" className='buttonSet'>
          Cancel
        </Button>
        <Button
        className='buttonSet'
          // disabled={title === ''}
          // onClick={(e) => {
          //   e.preventDefault();
          //   dispatch(addNote(id, title, scolor));
          //   setOpen(false);
          //   setTitle('');
          // }}
          color="primary1"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </Box>
    </Box>
    <AlertCart open={textShow} text={text} sev={textsev}/></>
  );
};

export default SecondSet;
