'use client';
import addNotification from 'react-push-notification';

import { useState, useEffect } from 'react';
import { Box, CardContent, Grid, Typography, List } from '@mui/material';
import { TaskList } from '@/utils/apiCalls';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import ContactDetails from '@/app/(DashboardLayout)/components/apps/contacts/ContactDetails';
import ContactList from '@/app/(DashboardLayout)/components/apps/contacts/ContactList';
import ContactSearch from '@/app/(DashboardLayout)/components/apps/contacts/ContactSearch';
import ContactFilter from '@/app/(DashboardLayout)/components/apps/contacts/ContactFilter';
import AppCard from '@/app/(DashboardLayout)/components/shared/AppCard';
import DaysList from '../../layout/vertical/sidebar/DaysList';
import CalenderList from '../../layout/vertical/sidebar/CalenderList';
const drawerWidth = 240;
import moment from 'moment';
import { useSelector } from 'react-redux';
const secdrawerWidth = 320;
import AuthRoute from '../../layout/vertical/sidebar/AuthRoute';
const Tasks = () => {
  const user = useSelector((state) => state.user);
  console.log(user,'userinfo')
  const [list, setList] = useState()
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  function getCurrentDate() {
    return moment().format('YYYY-MM-DD');
  }
  useEffect(() => {
    const fetchData = async () => {
      const data = {
        is_month: 'false',
        date: getCurrentDate(),
      };
      try {
        const response = await TaskList(user?.currentUser?.token, data);
        // console.log(response, 'responseup');
        setList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData()
  }, [user!==null]);

  // const Menuitems = [
  //   // {
  //   //   navlabel: false,
  //   //   subheader: "Home",
  //   // },

  //   {
  //     id: 1,
  //     weekday: 'Mo',
  //     // icon: IconAperture,
  //     date: '08.01.',
  //     // chip: "New",
  //     count: 6,
  //   },
  //   {
  //     id: 2,
  //     weekday: 'Tu',
  //     // icon: IconAperture,
  //     date: '09.01.',
  //     // chip: "New",
  //     count: 1,
  //   },
  //   // {
  //   //   navlabel: true,
  //   //   subheader: "Apps",
  //   // },
  //   {
  //     id: 3,
  //     weekday: 'We',
  //     // icon: IconAperture,
  //     date: '10.01.',
  //     // chip: "New",
  //     count: 2,
  //   },

  //   {
  //     id: 4,
  //     weekday: 'Th',
  //     // icon: IconAperture,
  //     date: '11.01.',
  //     // chip: "New",
  //     count: 2,
  //   },
  //   {
  //     id: 5,
  //     weekday: 'Fr',
  //     // icon: IconAperture,
  //     date: '12.01.',
  //     // chip: "New",
  //     count: 4,
  //   },
  //   {
  //     id: 6,
  //     weekday: 'Sa',
  //     // icon: IconAperture,
  //     date: '13.01.',
  //     // chip: "New",
  //     count: 4,
  //   },
  // ];
  // const CalenderItems = [
  //   // {
  //   //   navlabel: false,
  //   //   subheader: "Home",
  //   // },

  //   {
  //     id: 1,
  //     weekday: 'January',
  //     date: '01',
  //     // icon: IconAperture,
  //     // chip: "New",
  //     count: 6,
  //   },
  //   {
  //     id: 2,
  //     weekday: 'February',
  //     // icon: IconAperture,
  //     date: '02',
  //     // chip: "New",
  //     count: 1,
  //   },
  //   // {
  //   //   navlabel: true,
  //   //   subheader: "Apps",
  //   // },
  //   {
  //     id: 3,
  //     weekday: 'March',
  //     // icon: IconAperture,
  //     date: '03',
  //     // chip: "New",
  //     count: 2,
  //   },

  //   {
  //     id: 4,
  //     weekday: 'April',
  //     // icon: IconAperture,
  //     date: '04',
  //     // chip: "New",
  //     count: 2,
  //   },
  //   {
  //     id: 5,
  //     weekday: 'May',
  //     // icon: IconAperture,
  //     date: '05',
  //     // chip: "New",
  //     count: 4,
  //   },
  //   {
  //     id: 6,
  //     weekday: 'June',
  //     date: '06',
  //     // icon: IconAperture,

  //     // chip: "New",
  //     count: 4,
  //   },
  // ];
  const buttonClick = () => {
    addNotification({
        title: 'Warning',
        subtitle: 'This is a subtitle',
        message: 'This is a very long message',
        theme: 'darkblue',
        native: false // when using native, your OS will handle theming.
    });
};
  return (
   <AuthRoute> 
   <PageContainer title="Task List" description="this is Contact">
      <Breadcrumb title="Task List" subtitle="List Your Tasks" />
      <AppCard>
        <div className="flexing">
          {' '}
          <Typography m={1} variant="subtitle1" fontWeight={600} >
            Days
          </Typography>
          <Box sx={{ px: 2 }}>
            <List sx={{ pt: 0 }}>
              {list?.data[0]?.data.map((item) => (
                <DaysList item={item} key={item.id} />
              ))}
            </List>
          </Box>
          <Typography m={1} variant="subtitle1" fontWeight={600}>
            Months
          </Typography>
          <Box sx={{ px: 2 }}>
            <List sx={{ pt: 0 }}>
              {list?.data[1]?.data.map((item) => (
                <CalenderList item={item} key={item.id} />
              ))}
            </List>
          </Box>
        </div>
        {/* ------------------------------------------- */}
        {/* Left Part */}
        {/* ------------------------------------------- */}

        {/* <Drawer
          open={isLeftSidebarOpen}
          onClose={() => setLeftSidebarOpen(false)}
          sx={{
            width: drawerWidth,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, position: 'relative', zIndex: 2 },
            flexShrink: 0,
          }}
          variant={lgUp ? 'permanent' : 'temporary'}
        >
          <ContactFilter />
        </Drawer> */}
        {/* ------------------------------------------- */}
        {/* Middle part */}
        {/* ------------------------------------------- */}
        {/* <Box
          sx={{
            minWidth: secdrawerWidth,
            width: { xs: '100%', md: secdrawerWidth, lg: secdrawerWidth },
            flexShrink: 0,
          }}
        >
          <ContactSearch onClick={() => setLeftSidebarOpen(true)} />
          <ContactList showrightSidebar={() => setRightSidebarOpen(true)} />
        </Box> */}
        {/* ------------------------------------------- */}
        {/* Right part */}
        {/* ------------------------------------------- */}
        {/* <Drawer
          anchor="right"
          open={isRightSidebarOpen}
          onClose={() => setRightSidebarOpen(false)}
          variant={mdUp ? 'permanent' : 'temporary'}
          sx={{
            width: mdUp ? secdrawerWidth : '100%',
            zIndex: lgUp ? 0 : 1,
            flex: mdUp ? 'auto' : '',
            [`& .MuiDrawer-paper`]: { width: '100%', position: 'relative' },
          }}
        >
          {/* back btn Part 
          {mdUp ? (
            ''
          ) : (
            <Box sx={{ p: 3 }}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => setRightSidebarOpen(false)}
                sx={{ mb: 3, display: { xs: 'block', md: 'none', lg: 'none' } }}
              >
                Back{' '}
              </Button>
            </Box>
          )}
          <ContactDetails />
        </Drawer> */}
      </AppCard>
    </PageContainer>
    </AuthRoute>
  );
};

export default Tasks;
