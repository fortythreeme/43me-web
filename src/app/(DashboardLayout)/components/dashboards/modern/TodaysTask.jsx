import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import DashboardCard from '../../shared/DashboardCard';
import { useSelector  } from 'react-redux';
import CustomSelect from '../../forms/theme-elements/CustomSelect';
import {
  MenuItem,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  TableContainer,
  Stack,
} from '@mui/material';
import TodaysTaskData from './TodaysTaskData';
import { TaskList } from '@/utils/apiCalls';
import { useEffect,useState } from 'react';
import moment from 'moment';
const performers = TodaysTaskData;

const TodaysTask = () => {
  // for select
  const [list, setList] = useState(null);
  const [month, setMonth] = React.useState('1');
  const[tasks,setTasks] = useState()
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.user.currentUser.token);
  function getCurrentDate() {
    return moment().format('YYYY-MM-DD');
  }
  
  const handleChange = (event) => {
    setMonth(event.target.value);
  };
  let dat = getCurrentDate();
  useEffect(() => {
    if (token) {
      const fetchData = async () => {
       
      
         const data = {
            is_month: false,
            date: getCurrentDate()
          };
        // console.log(data,"first")
        
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_APP}task-by-date`, data ,{
            headers: {
              Authorization: `Bearer ${user?.currentUser?.token}`,
            },
          });
          // console.log(response,'res')
          const filteredTasks = response.data.data.filter(task => !task.is_completed);
          setTasks(filteredTasks)
          
          // console.log(dat,'date')
          
        } catch (error) {
          // Handle errors
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [token]);
  return (
    <DashboardCard
      title="Today's Tasks"
      // subtitle="Best Products"
      // action={
      //   <CustomSelect
      //     labelId="month-dd"
      //     id="month-dd"
      //     size="small"
      //     value={month}
      //     onChange={handleChange}
      //   >
      //     <MenuItem value={1}>March 2023</MenuItem>
      //     <MenuItem value={2}>April 2023</MenuItem>
      //     <MenuItem value={3}>May 2023</MenuItem>
      //   </CustomSelect>
      // }
    >
              {tasks?.length > 0 && <Link href={`/apps/view-all/${dat}`}><Typography variant="subtitle2" fontWeight={600} className='absolutePosition'>View All</Typography></Link> }
    
      <TableContainer>
      {tasks?.length > 0 ? <Table
          aria-label="simple table"
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          <TableHead>
            <TableRow>
              {/* <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>Task Title</Typography>
              </TableCell> */}
              {/* <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>Project</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>Priority</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>Budget</Typography>
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks?.slice(0, 6).map((basic) => (
              <TableRow key={basic.id}>
                <TableCell>
                  <Stack direction="row" spacing={2}>
                    {/* <Avatar src={basic.imgsrc} alt={basic.imgsrc} sx={{ width: 40, height: 40 }} /> */}
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {basic.description}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                {/* <TableCell>
                  <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    {basic.pname}
                  </Typography>
                </TableCell> */}
                {/* <TableCell>
                  <Chip chipcolor={basic.status == 'Active' ? 'success' : basic.status == 'Pending' ? 'warning' : basic.status == 'Completed' ? 'primary' : basic.status == 'Cancel' ? 'error' : 'secondary'} 
                  <Chip
                    sx={{
                      bgcolor:
                        basic.status === 'High'
                          ? (theme) => theme.palette.error.light
                          : basic.status === 'Medium'
                            ? (theme) => theme.palette.warning.light
                            : basic.status === 'Low'
                              ? (theme) => theme.palette.success.light
                              : (theme) => theme.palette.secondary.light,
                      color:
                        basic.status === 'High'
                          ? (theme) => theme.palette.error.main
                          : basic.status === 'Medium'
                            ? (theme) => theme.palette.warning.main
                            : basic.status === 'Low'
                              ? (theme) => theme.palette.success.main
                              : (theme) => theme.palette.secondary.main,
                      borderRadius: '8px',
                    }}
                    size="small"
                    label={basic.status}
                  />
                </TableCell> */}
                {/* <TableCell>
                  <Typography variant="subtitle2">${basic.budget}k</Typography>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table> : <Typography>No Tasks Found</Typography>}
      </TableContainer>
    </DashboardCard>
  );
};

export default TodaysTask;
