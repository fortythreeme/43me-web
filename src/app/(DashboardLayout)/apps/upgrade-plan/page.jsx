'use client';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
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
import { Box } from '@mui/material';
import AppCard from '../../components/shared/AppCard';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
// import { StripePay } from '@/utils/apiCalls';
moment.locale('en-GB');
const localizer = momentLocalizer(moment);
import AuthRoute from '../../layout/vertical/sidebar/AuthRoute';
import { StripePay, StripeStatus, UpdateSubscription } from '@/utils/apiCalls';
import { setUser, updateDaysLeft } from '@/store/user/userSlice';
import AlertCart from '../../components/apps/ecommerce/productCart/AlertCart';
const Subscription = () => {
  const [dimensions, setDimensions] = useState({ width: 250, height: 250 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setDimensions({ width: 120, height: 120 });
      } else {
        setDimensions({ width: 250, height: 250 });
      }
    };

    // Set initial dimensions based on the current window size
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const dispatch = useDispatch();
  let interval;
  const [text, setText] = useState('');
  const [textsev, setTextSev] = useState('');
  const [textShow, setTextShow] = useState(false);
  const user = useSelector((state) => state.user);
  const [calevents, setCalEvents] = React.useState();
  const [isloading, setisloading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [slot, setSlot] = React.useState();
  const [start, setStart] = React.useState();
  const router = useRouter();
  const [end, setEnd] = React.useState();
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [color, setColor] = React.useState('default');
  const [events, setEvents] = useState();
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

  const ColorVariation = [
    {
      id: 1,
      eColor: '#FFC800',
      value: 'default',
    },
    {
      id: 2,
      eColor: '#eda83b',
      value: 'secColor',
    },
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
    setOpen(true);
    setSlot(slotInfo);
    setStart(slotInfo.start);
    setEnd(slotInfo.end);
  };

  const editEvent = (event) => {
    console.log(event, 'a');
    if (event.title > 0) {
      router.push(`/apps/view-all/${event.id}`);
    } else {
      setOpen(true);
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
    setOpen(false);
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
  // let Payment = false;
  const UpdateSub = async (status) => {
    const dat = moment(new Date(user?.currentUser?.expiry_date));
    const next_expiry_date = dat.add(1, 'years').format('YYYY-MM-DD');
    // console.log(dat,'expiry_date')
    try {
      const data = {
        expiry_date: next_expiry_date,
        plan_identifier: 'me.fortythree.iap.oneyear',
        platform: 'stripe',
        receipt: JSON.stringify(status),
      };
      const res = await UpdateSubscription(user.currentUser.token, data);
      if (res.success) {
        dispatch(
          setUser({
            ...user.currentUser,
            is_subscribed: res.data.is_subscribed,
            expiry_date: res.data.expiry_date,
            days_left: res.data.days_left,
            plan_title: res.data.plan_title,
          }),
        );
        dispatch(updateDaysLeft(res.data.days_left));
        // setTextShow(true);
        // Payment = true;
        triggerAlert('Subscription Updated Successfully!', 'success');
        // setTextSev('success');
      }
      if (res.success === false) {
        // alert("Error, Try Again")
        // setTextShow(true);
        triggerAlert('Error, Try Again', 'error');
        // setTextSev('error');
      }
      setisloading(false);
      // location.reload()
      console.log(res, 'res');
    } catch (err) {
      console.log(err);
      // alert("Error, Try Again")
      // setTextShow(true);
      triggerAlert('Error, Try Again', 'error');
      // setTextSev('error');
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
          ) {
            console.log(true);
            UpdateSub(CheckStatus.data.status);
          } else {
            setisloading(false);

            // setTextShow(true);
            triggerAlert('Transaction Failed!', 'error');
            // setTextSev('error');
          }
          //   dispatch(setUser({
          //     ...user.currentUser,
          //     is_subscribed:CheckStatus.data.is_subscribed,
          //     expiry_date:CheckStatus.data.expiry_date,
          //     days_left:CheckStatus.data.days_left,
          //     plan_title:CheckStatus.data.plan_title
          // }));
        } else {
          // alert('Transaction Failed!')
          setisloading(false);
          // setTextShow(true);
          triggerAlert('Transaction Failed!', 'error');
          // setTextSev('error');
        }
      } catch (error) {
        // setTextShow(true);
        triggerAlert('Transaction Failed!', 'error');
        // setTextSev('error');
        console.error('Error fetching Stripe status:', error);
      }
    }
  };
  const handleSubscribe = async () => {
    try {
      const response = await StripePay();
      if (response.data && response.data.data.CheckoutUrl) {
        // Open the CheckoutUrl in a new tab
        localStorage.removeItem('sessionId');
        const paymentWindow = window.open(response.data.data.CheckoutUrl, '_blank');
        setisloading(true);
        interval = setInterval(CheckStatus, 5000);

        const windowCheckInterval = setInterval(() => {
          if (paymentWindow && paymentWindow.closed) {
            clearInterval(windowCheckInterval);
            clearInterval(interval);
            setisloading(false);
            // Only show the "Transaction Cancelled" alert if payment wasn't completed
            // setTimeout(() => {
            //   if (!Payment) {
            //     // Only show the "Transaction Cancelled" alert if payment wasn't completed
            //     triggerAlert('Transaction Cancelled! Try Again.', 'error');
            //   }
            // }, 2000); // 2-second delay to ensure state updates
          }
        }, 500);
      }
      console.log(response);
    } catch (err) {
      console.log(err);
      setisloading(false);
    }
  };

  const triggerAlert = (message, severity) => {
    setText(message);
    setTextSev(severity);
    setTextShow(true);

    // Automatically close the alert after 6 seconds
    setTimeout(() => {
      setTextShow(false);
    }, 6000);
  };
  return (
    <AuthRoute>
      <>
        <PageContainer title="Upgrade your plan" description="Upgrade your plan">
          <Breadcrumb title="Upgrade Your Plan" subtitle="Select from the following" />
          <AppCard className="centering">
            <Box className="boxSize">
              <Typography className="heading" fontWeight={800}>
                Get 43Me now & stay organised{' '}
              </Typography>
              <Typography
                color={'.main'}
                mt={1}
                variant="subtitle1"
                fontWeight={600}
                sx={{
                  width: '50%',
                  // maxWidth: "500px",  maxHeight: '500px',
                  '@media (max-width:600px)': {
                    width: '90%',
                    marginBottom: '25px',
                  },
                }}
              >
                Full access : Get Access to your tickler file. Create And Manage unlimited tasks.
                Access from multiple devices
              </Typography>
              <BlankCard
                sx={{
                  // maxWidth: "500px",  maxHeight: '500px',
                  '@media (max-width:600px)': {
                    height: '30%',
                  },
                }}
              >
                {dimensions?.width === 250 ? (
                  <CardContent>
                    <Box className="cardRocket">
                      <Box>
                        <Image
                          src={'/images/rocket.png'}
                          alt="bg"
                          width={dimensions.width}
                          height={dimensions.height}
                          // sx={{
                          //   // width: '100%',
                          //   // maxWidth: "500px",  maxHeight: '500px',
                          //   '@media (max-width:600px)': {
                          //     height: '120px',
                          //   },
                          // }}
                        />
                      </Box>
                      <Box>
                        <Typography
                          color={'.main'}
                          variant="subtitle1"
                          fontWeight={600}
                          fontSize={'18px'}
                        >
                          Full Access
                        </Typography>
                        <Typography
                          color={'.main'}
                          variant="subtitle1"
                          fontSize={'18px'}
                          fontWeight={600}
                        >
                          One Year Subscription
                        </Typography>
                        <Typography
                          color={'.main'}
                          variant="subtitle1"
                          fontSize={'18px'}
                          fontWeight={600}
                        >
                          $24.99
                        </Typography>
                      </Box>
                      <Box>
                        <Button className="subscribe" onClick={handleSubscribe}>
                          Subscribe
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                ) : (
                  <CardContent>
                    <Box className="cardRocket">
                      <Box>
                        <Image
                          src={'/images/rocket.png'}
                          alt="bg"
                          width={dimensions.width}
                          height={dimensions.height}
                          // sx={{
                          //   // width: '100%',
                          //   // maxWidth: "500px",  maxHeight: '500px',
                          //   '@media (max-width:600px)': {
                          //     height: '120px',
                          //   },
                          // }}
                        />
                      </Box>
                      <Box>
                        <Typography
                          color={'.main'}
                          variant="subtitle1"
                          fontWeight={600}
                          fontSize={'18px'}
                        >
                          Full Access
                        </Typography>
                        <Typography
                          color={'.main'}
                          variant="subtitle1"
                          fontSize={'18px'}
                          fontWeight={600}
                        >
                          One Year Subscription
                        </Typography>
                        <Typography
                          color={'.main'}
                          variant="subtitle1"
                          fontSize={'18px'}
                          fontWeight={600}
                        >
                          $24.99
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        // maxWidth: "500px",  maxHeight: '500px',
                        '@media (max-width:600px)': {
                          margin: '15px auto',
                        },
                      }}
                    >
                      <Button className="subscribe" onClick={handleSubscribe}>
                        Subscribe
                      </Button>
                    </Box>
                  </CardContent>
                )}
              </BlankCard>
              {/* <BlankCard>
       
        <CardContent>
          1 Year Plan
        </CardContent>
      </BlankCard> */}
            </Box>
          </AppCard>
        </PageContainer>
        {isloading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100vw',
              position: 'fixed',
              top: '0',
              left: '10%',
              height: '100vh',
              zIndex: '2000',
              background: '#cccccc57',
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </>
      <AlertCart open={textShow} text={text} sev={textsev} />
    </AuthRoute>
  );
};

export default Subscription;
