'use client';

import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import AuthRoute from '../../layout/vertical/sidebar/AuthRoute';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import Events from '@/app/(DashboardLayout)/EventData';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import axios from 'axios';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import { IconCheck } from '@tabler/icons-react';
import BlankCard from '@/app/(DashboardLayout)/components/shared/BlankCard';
import { useRouter } from 'next/navigation';
import AddTask from '../../components/dashboards/modern/AddTask';
import { useSelector } from 'react-redux';
moment.locale('en-GB');
const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const user = useSelector((state) => state.user);

  const [calevents, setCalEvents] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false)
  const [title, setTitle] = React.useState('');
  const [slot, setSlot] = React.useState();
  const [start, setStart] = React.useState();
  const router = useRouter()
  const [end, setEnd] = React.useState();
  const [color, setColor] = React.useState('default');
  const[events,setEvents] = useState()
  const [update, setUpdate] = React.useState();
  
  function convertDateStringToDateObject(dateString) {
    // Assuming dateString is in the format "DD/MM"
    const [day, month] = dateString.split('/').map(Number);
  
    // Creating a new Date object with the current year
    const currentYear = new Date().getFullYear();
  
    // Note: Months in JavaScript are 0-indexed, so we subtract 1
    const dateObject = new Date(currentYear, month - 1, day, 0, 0);
  
    return dateObject;
  }
  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_APP}list`, {
        headers: {
          Authorization: `Bearer ${user?.currentUser?.token}`,
        },
      });

      // Handle the response data here
      console.log(response.data.data);
      const transformedEvents = response.data.data[0].data.map((event) => ({
        title: event.count ,
        start: convertDateStringToDateObject(event.date),
        end:convertDateStringToDateObject(event.date),
        color: event.countColorBG,
        id: event.id,
      }));
      // console.log(transformedEvents,'ss')
      setCalEvents(transformedEvents)
    } catch (error) {
      // Handle errors
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [])
 
  const ColorVariation = [
    {
      id: 1,
      eColor: '#FFC800',
      value: 'default',
    },
    {
      id: 2,
      eColor: '#eda83b',
      value: 'secColor',}
    // },
    // {
    //   id: 3,
    //   eColor: '#fc4b6c',
    //   value: 'red',
    // },
    // {
    //   id: 4,
    //   eColor: '#615dff',
    //   value: 'azure',
    // },
    // {
    //   id: 5,
    //   eColor: '#fdd43f',
    //   value: 'warning',
    // },
  ];
  const addNewEventAlert = (slotInfo) => {
    setOpen1(true);
    setSlot(slotInfo);
    setStart(slotInfo.start);
    setEnd(slotInfo.end);
  };

  const editEvent = (event) => {
    console.log(event,'a')
    if(event.title>0){
    router.push(`/apps/view-all/${event.id}`)}
    else{
      setOpen(true)
    }
    // setOpen(true);
    // const newEditEvent = calevents.find((elem) => elem.title === event.title);
    // setColor(event.color);
    // setTitle(newEditEvent.title);
    // setColor(newEditEvent.color);
    // setStart(newEditEvent.start);
    // setEnd(newEditEvent.end);
    // setUpdate(event);
  };

  const updateEvent = (e) => {
    e.preventDefault();
    setCalEvents(
      calevents.map((elem) => {
        if (elem.title === update.title) {
          return { ...elem, title, start, end, color };
        }

        return elem;
      }),
    );
    setOpen(false);
    setTitle('');
    setColor('');
    setStart('');
    setEnd('');
    setUpdate(null);
  };
  const inputChangeHandler = (e) => setTitle(e.target.value);
  const selectinputChangeHandler = (id) => setColor(id);

  const submitHandler = (e) => {
    e.preventDefault();
    const newEvents = calevents;
    newEvents.push({
      title,
      start,
      end,
      color,
    });
    setOpen(false);
    e.target.reset();
    setCalEvents(newEvents);
    setTitle('');
    setStart(new Date());
    setEnd(new Date());
  };
  const deleteHandler = (event) => {
    const updatecalEvents = calevents.filter((ind) => ind.title !== event.title);
    setCalEvents(updatecalEvents);
  };

  const handleClose = () => {
    // eslint-disable-line newline-before-return
    setOpen1(false);
    setTitle('');
    setStart(new Date());
    setEnd(new Date());
    setUpdate(null);
  };

  const eventColors = (event) => {
    if (event.color) {
      return { className: `event-${event.color}` };
    }

    return { className: `event-default` };
  };

  const handleStartChange = (newValue) => {
    setStart(newValue);
  };
  const handleEndChange = (newValue) => {
    setEnd(newValue);
  };

  return (
    <AuthRoute>
    <PageContainer title="Calendar" description="this is Calendar">
      <Breadcrumb title="Calendar" subtitle="View your Tasks Here" />
      <BlankCard>
        {/* ------------------------------------------- */}
        {/* Calendar */}
        {/* ------------------------------------------- */}
        <CardContent>
          <Calendar
            selectable
            events={calevents}
            defaultView="month"
            scrollToTime={new Date(1970, 1, 1, 6)}
            defaultDate={new Date()}
            localizer={localizer}
            style={{ height: 'calc(100vh - 350px' }}
            onSelectEvent={(event) => editEvent(event)}
            // onSelectSlot={(event) => editEvent(event)}
            eventPropGetter={(event) => eventColors(event)}
            views={['month', 'agenda']}
          />
        </CardContent>
      </BlankCard>
      {/* ------------------------------------------- */}
      {/* Add Calendar Event Dialog */}
      {/* ------------------------------------------- */}
      <Dialog open={false} onClose={handleClose} fullWidth maxWidth="xs">
        <form onSubmit={update ? updateEvent : submitHandler}>
          <DialogContent>
            {/* ------------------------------------------- */}
            {/* Add Edit title */}
            {/* ------------------------------------------- */}
            <Typography variant="h4" sx={{ mb: 2 }}>
              {update ? 'Update Event' : 'Add Event'}
            </Typography>
            <Typography mb={3} variant="subtitle2">
              {!update
                ? 'To add Event kindly fillup the title and choose the event color and press the add button'
                : 'To Edit/Update Event kindly change the title and choose the event color and press the update button'}
              {slot?.title}
            </Typography>

            <TextField
              id="Event Title"
              placeholder="Enter Event Title"
              variant="outlined"
              fullWidth
              label="Event Title"
              value={title}
              sx={{ mb: 3 }}
              onChange={inputChangeHandler}
            />
            {/* ------------------------------------------- */}
            {/* Selection of Start and end date */}
            {/* ------------------------------------------- */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                inputFormat="MM/dd/yyyy"
                value={start}
                onChange={handleStartChange}
                renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 3 }} />}
              />
              <DatePicker
                label="End Date"
                inputFormat="MM/dd/yyyy"
                value={end}
                onChange={handleEndChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    sx={{ mb: 3 }}
                    error={start > end}
                    helperText={start > end ? 'End date must be later than start date' : ''}
                  />
                )}
              />
            </LocalizationProvider>

            {/* ------------------------------------------- */}
            {/* Calendar Event Color*/}
            {/* ------------------------------------------- */}
            <Typography variant="h6" fontWeight={600} my={2}>
              Select Event Color
            </Typography>
            {/* ------------------------------------------- */}
            {/* colors for event */}
            {/* ------------------------------------------- */}
            {ColorVariation.map((mcolor) => {
              return (
                <Fab
                  color="primary"
                  style={{ backgroundColor: mcolor.eColor }}
                  sx={{
                    marginRight: '3px',
                    transition: '0.1s ease-in',
                    scale: mcolor.value === color ? '0.9' : '0.7',
                  }}
                  size="small"
                  key={mcolor.id}
                  onClick={() => selectinputChangeHandler(mcolor.value)}
                >
                  {mcolor.value === color ? <IconCheck width={16} /> : ''}
                </Fab>
              );
            })}
          </DialogContent>
          {/* ------------------------------------------- */}
          {/* Action for dialog */}
          {/* ------------------------------------------- */}
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={handleClose}>Cancel</Button>

            {update ? (
              <Button
                type="submit"
                color="error"
                variant="contained"
                onClick={() => deleteHandler(update)}
              >
                Delete
              </Button>
            ) : (
              ''
            )}
            <Button type="submit" disabled={!title} variant="contained">
              {update ? 'Update Event' : 'Add Event'}
            </Button>
          </DialogActions>
          {/* ------------------------------------------- */}
          {/* End Calendar */}
          {/* ------------------------------------------- */}
        </form>
      </Dialog>
      {open1 && <AddTask onClose={handleClose} open={open1} />}
    </PageContainer>
    </AuthRoute>
  );
};

export default BigCalendar;
