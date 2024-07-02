'use client';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// components
import YearlyBreakup from '@/app/(DashboardLayout)/components/dashboards/modern/YearlyBreakup';
import MonthlyEarnings from '@/app/(DashboardLayout)/components/dashboards/modern/MonthlyEarnings';
import TopCards from '@/app/(DashboardLayout)/components/dashboards/modern/TopCards';
import RevenueUpdates from '@/app/(DashboardLayout)/components/dashboards/modern/RevenueUpdates';
import EmployeeSalary from '@/app/(DashboardLayout)/components/dashboards/modern/EmployeeSalary';
import Customers from '@/app/(DashboardLayout)/components/dashboards/modern/Customers';
import Projects from '@/app/(DashboardLayout)/components/dashboards/modern/Projects';
import Social from '@/app/(DashboardLayout)/components/dashboards/modern/Social';
import SellingProducts from '@/app/(DashboardLayout)/components/dashboards/modern/SellingProducts';
import WeeklyStats from '@/app/(DashboardLayout)/components/dashboards/modern/WeeklyStats';
import TopPerformers from '@/app/(DashboardLayout)/components/dashboards/modern/TopPerformers';
import TodaysTask from './components/dashboards/modern/TodaysTask';
import TasksPie from './components/dashboards/modern/TasksPie';
import { useSelector } from 'react-redux';
import { TaskList } from '@/utils/apiCalls';
import AuthRoute from './layout/vertical/sidebar/AuthRoute';
import moment from 'moment';
export default function Dashboard() {
  const user = useSelector((state) => state.user);
  // const token = useSelector((state) => state.user.currentUser.token);
  function getCurrentDate() {
    return moment().format('YYYY-MM-DD');
  }
  console.log(user,'user')
  const [isLoading, setLoading] = useState(true);
  const [list, setList] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
 

  return (
    <AuthRoute>
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={0.5}>
        <Grid container spacing={2}>
          {/* column */}
          <Grid item xs={12} lg={12}>
            <TopCards/>
          </Grid>
          {/* column */}
          {/* <Grid item xs={12} lg={8}>
            <RevenueUpdates isLoading={isLoading} />
          </Grid> */}
           <Grid item xs={10} lg={7} className='relativePosition'>
           <TodaysTask />
          </Grid>
          {/* column */}
          {/* <Grid item xs={12} lg={5}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} lg={12}>
                <TasksPie isLoading={isLoading} />
              </Grid>
              {/* <Grid item xs={12} sm={6} lg={12}>
                <MonthlyEarnings isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid> */}
          {/* column */}
          {/* <Grid item xs={12} lg={4}>
            <EmployeeSalary isLoading={isLoading} />
          </Grid> */}
          {/* column */}
          {/* <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Customers isLoading={isLoading} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Projects isLoading={isLoading} />
              </Grid>
              <Grid item xs={12}>
                <Social />
              </Grid>
            </Grid>
          </Grid> */}
          {/* column */}
          {/* <Grid item xs={12} lg={4}>
            <SellingProducts />
          </Grid> */}
          {/* column */}
          {/* <Grid item xs={12} lg={4}>
            <WeeklyStats isLoading={isLoading} />
          </Grid> */}
          {/* column */}
          {/* <Grid item xs={12} lg={8}>
            <TopPerformers />
          </Grid> */}
        </Grid>
      </Box>
    </PageContainer>
    </AuthRoute>
  );
}
