'use client';
import addNotification from 'react-push-notification';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Box, CardContent, Grid, Typography, List, Divider } from '@mui/material';
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
import DaysListUpcoming from '../../layout/vertical/sidebar/DaysListUpcoming';
import CalenderList from '../../layout/vertical/sidebar/CalenderList';
import ViewTask from '../../layout/vertical/sidebar/ViewTask';
const drawerWidth = 240;
import moment from 'moment';
import { useSelector } from 'react-redux';
const secdrawerWidth = 320;
import AuthRoute from '../../layout/vertical/sidebar/AuthRoute';
import ViewTaskAll from '../../layout/vertical/sidebar/ViewTaskAll';
const Monthly = () => {
  const user = useSelector((state) => state.user);
  console.log(user, 'userinfo');
  const [list, setList] = useState();
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
    fetchData();

    // if (list !== null) {
    //   const fetchData1 = async () => {
    //     let is_month = checkDateFormat(list?.data[0].id);
    //     let data;
    //     if (is_month) {
    //       data = {
    //         is_month: is_month,
    //         month: params.id,
    //       };
    //     } else {
    //       data = {
    //         is_month: is_month,
    //         date: params.id,
    //       };
    //     }
    //     // console.log(data,"first")
    //     try {
    //       const response = await axios.post(`${process.env.NEXT_PUBLIC_APP}task-by-date`, data, {
    //         headers: {
    //           Authorization: `Bearer ${user?.currentUser?.token}`,
    //         },
    //       });

    //       const filteredTasks = response.data.data.filter((task) => !task.is_completed);
    //       setTasks(filteredTasks);
    //     } catch (error) {
    //       // Handle errors
    //       console.error('Error fetching data:', error);
    //     }
    //   };
    //   fetchData1();
    // }

  }, [user !== null]);

  const buttonClick = () => {
    addNotification({
      title: 'Warning',
      subtitle: 'This is a subtitle',
      message: 'This is a very long message',
      theme: 'darkblue',
      native: false, // when using native, your OS will handle theming.
    });
  };
  const hasItemsWithCount = list?.data[1]?.data.slice(1, 31).some((item) => item.count > 0);
  return (
    <AuthRoute>
      <PageContainer title="Task List" description="this is Contact">
        <Breadcrumb title="Task List" subtitle="List Your Tasks" />
        <AppCard>
          <div className="flexing">
            {' '}
            <Box sx={{ px: 2 }}>
              <List sx={{ pt: 0 }}>
              {hasItemsWithCount ? (list?.data[1]?.data.map((item) => (
                  <>
                  {item.count>0 && <><Link href={`/apps/view-all/${item.id}`}>
                    <DaysListUpcoming item={item} key={item.id} />
                    <ViewTaskAll item={item} key={item.id} /></Link>
                    <Divider/></> }
                  </>
                ))):"No Monthly Tasks Found"}
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

export default Monthly;
