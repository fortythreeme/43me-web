import Image from 'next/image';
import { Box, CardContent, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { TaskList } from '@/utils/apiCalls';
import Link from 'next/link';
const topcards = [
  {
    icon: '/images/svgs/icon-user-male.svg',
    title: "Today's Tasks",
    digits: '96',
    bgcolor: 'primary1',
  },
  {
    icon: '/images/svgs/icon-briefcase.svg',
    title: 'Upcoming Tasks',
    digits: '3,650',
    bgcolor: 'warning',
  },
  {
    icon: '/images/svgs/icon-mailbox.svg',
    title: 'Monthly Tasks',
    digits: '356',
    bgcolor: 'primary1',
  },
  // {
  //   icon: '/images/svgs/icon-favorites.svg',
  //   title: "Events",
  //   digits: "696",
  //   bgcolor: "error",
  // },
  // {
  //   icon: '/images/svgs/icon-speech-bubble.svg',
  //   title: "Payroll",
  //   digits: "$96k",
  //   bgcolor: "success",
  // },
  // {
  //   icon: '/images/svgs/icon-connect.svg',
  //   title: "Reports",
  //   digits: "59",
  //   bgcolor: "info",
  // },
];

const TopCards = () => {
  // console.log(item)
  const [list, setList] = useState(null);
  function getCurrentDate() {
    return moment().format('YYYY-MM-DD');
  }
  const token = useSelector((state) => state.user.currentUser.token);

  const calculateTotalCount = (data) => {
    // console.log(data,'data')
    let totalCount = 0;
    for (let i = 1; i < data.length - 1; i++) {
      totalCount += data[i].count;
    }
    return totalCount;
  };
  const calculateTotalMonth = (data) => {
    // console.log(data,'data')
    let totalCount = 0;
    for (let i = 0; i < data.length; i++) {
      totalCount += data[i].count;
    }
    return totalCount;
  };
  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        const data = {
          is_month: 'false',
          date: getCurrentDate(),
        };
        try {
          const response = await TaskList(token, data);
          // console.log(response.data, 'responseup');
          setList(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [token]);

  return (
    <Grid container spacing={3} mt={1}>
      {/* {topcards.map((topcard, i) => ( */}
      {list && (
        <>
          <Grid item xs={12} sm={4} lg={2}>
            <Link href={`/apps/view-all/${list.data[0]?.data[0].id}`}><Box bgcolor={'primary1' + '.light'} className="cursorhover" textAlign="center">
              <CardContent>
                <Image src="/images/svgs/icon-user-male.svg" alt={'icon'} width="50" height="50" />
                <Typography
                  color={'primary1' + '.main'}
                  mt={1}
                  variant="subtitle1"
                  fontWeight={600}
                >
                  Today&apos;s Tasks
                </Typography>
                <Typography color={'primary1' + '.main'} variant="h4" fontWeight={600}>
                  {list.data[0]?.data[0].count}
                </Typography>
              </CardContent>
            </Box></Link>
          </Grid>
          <Grid item xs={12} sm={4} lg={2}>
          <Link href={`/apps/upcoming-tasks`}><Box bgcolor={'warning' + '.light'} textAlign="center">
              <CardContent>
                <Image src="/images/svgs/icon-briefcase.svg" alt={'icon'} width="50" height="50" />
                <Typography color={'warning' + '.main'} mt={1} variant="subtitle1" fontWeight={600}>
                  Upcoming Tasks
                </Typography>
                <Typography color={'warning' + '.main'} variant="h4" fontWeight={600}>
                  {calculateTotalCount(list.data[0]?.data)}
                </Typography>
              </CardContent>
            </Box></Link>
          </Grid>
          <Grid item xs={12} sm={4} lg={2}>
          <Link href={`/apps/monthly-tasks`}><Box bgcolor={'primary1' + '.light'} textAlign="center">
              <CardContent>
                <Image
                  src="/images/svgs/icon-mailbox.svg"
                  alt={'topcard.icon'}
                  width="50"
                  height="50"
                />
                <Typography
                  color={'primary1' + '.main'}
                  mt={1}
                  variant="subtitle1"
                  fontWeight={600}
                >
                  Monthly Tasks
                </Typography>
                <Typography color={'primary1' + '.main'} variant="h4" fontWeight={600}>
                  {calculateTotalMonth(list.data[1]?.data)}
                </Typography>
              </CardContent>
            </Box></Link>
          </Grid>{' '}
        </>
      )}
      {/* // ))} */}
    </Grid>
  );
};

export default TopCards;
