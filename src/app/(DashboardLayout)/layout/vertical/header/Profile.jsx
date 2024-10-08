import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import * as dropdownData from './data';
import { useDispatch } from 'react-redux';
import { IconMail } from '@tabler/icons-react';
import { Stack } from '@mui/system';
import Image from 'next/image';
import { logout } from '@/store/user/userSlice';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    // console.log('hi')
    dispatch(logout());
    router.replace('/login');
  };
  console.log(user, 'update');
  const [filteredProfile, setFilteredProfile] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    // const oneMonthLater = currentDate.clone().add(1, 'month').endOf('day');
    // console.log(oneMonthLater,'oneMonthLater')
    const filtered = dropdownData?.profile.filter((profile) => {
      if (profile.title === 'Upgrade Plan' && user?.currentUser?.expiry_date) {
        const expiryDate = new Date(user?.currentUser?.expiry_date);
        // console.log(expiryDate >= currentDate && expiryDate - currentDate > 30,'diffference')
        const differenceInDays =  user?.currentUser?.days_left
        // console.log(differenceInDays <= 30, 'difference in days');
        return differenceInDays <= 30;
      }
      return true;
    });

    setFilteredProfile(filtered);
  }, [dropdownData]);
  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        {user?.currentUser === null ? (
          <>
            {' '}
            <Avatar
              src={'/images/profile/user-1.jpg'}
              alt={'ProfileImg'}
              sx={{
                width: 35,
                height: 35,
              }}
            />
          </>
        ) : (
          <>
            <Avatar
              alt={'ProfileImg'}
              sx={{ bgcolor: `${'primary1.dark'}`, width: 35, height: 35 }}
              style={{ fontWeight: '900', fontSize: '18px' }}
            >
              {user?.currentUser?.user.first_name.charAt(0).toUpperCase()}
            </Avatar>
          </>
        )}
        <Box></Box>
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '360px',
            p: 4,
          },
        }}
      >
        <Typography variant="h5">User Profile</Typography>
        <Stack direction="row" py={3} spacing={2} alignItems="center">
          {user?.currentUser === null ? (
            <>
              <Avatar
                src={'/images/profile/user-1.jpg'}
                alt={'ProfileImg'}
                sx={{ width: 95, height: 95 }}
              />
            </>
          ) : (
            <>
              <Avatar
                alt={'ProfileImg'}
                sx={{ bgcolor: `${'primary1.dark'}`, height: 95, width: 95 }}
                style={{ border: '3px solid #fff', fontWeight: '900', fontSize: '58px' }}
              >
                {user?.currentUser?.user.first_name.charAt(0).toUpperCase()}
              </Avatar>
            </>
          )}
          <Box>
            <Typography
              variant="subtitle2"
              color="textPrimary"
              fontWeight={600}
              style={{ textTransform: 'capitalize' }}
            >
              {user?.currentUser?.user.first_name}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {user?.currentUser?.is_subscribed ? 'Subscription' : 'No Subscription'}
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              display="flex"
              alignItems="center"
              gap={1}
            >
              {/* <IconMail width={15} height={15} /> */}
              {user?.currentUser !== null && (
                <>
                  {user?.currentUser.plan ? (
                    <>Current Plan: {user.currentUser.plan.title}</>
                  ) : (
                    <>Current Plan: {user.currentUser.plan_title}</>
                  )}
                </>
              )}
              <br />
              Days Left : {user?.daysLeft}
            </Typography>
          </Box>
        </Stack>
        <Divider />
        {filteredProfile.map((profile) => (
          <Box key={profile.title}>
            <Box sx={{ py: 2, px: 0 }} className="hover-text-primary">
              <Link href={profile.href}>
                <Stack direction="row" spacing={2}>
                  <Box
                    width="45px"
                    height="45px"
                    bgcolor="primary1.light"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink="0"
                  >
                    <Avatar
                      src={profile.icon}
                      alt={profile.icon}
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: 0,
                      }}
                    />
                  </Box>
                  <Box className="Center">
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      color="textPrimary"
                      className="text-hover"
                      noWrap
                      sx={{
                        width: '240px',
                      }}
                    >
                      {profile.title}
                    </Typography>
                  </Box>
                </Stack>
              </Link>
            </Box>
          </Box>
        ))}
        <Box mt={2}>
          {/* <Box bgcolor="primary.light" p={3} mb={3} overflow="hidden" position="relative">
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Typography variant="h5" mb={2}>
                  Unlimited <br />
                  Access
                </Typography>
                <Button variant="contained" color="primary">
                  Upgrade
                </Button>
              </Box>
              <Image src={"/images/backgrounds/unlimited-bg.png"} width={150} height={183} alt="unlimited" className="signup-bg" />
            </Box>
          </Box> */}
          <Button variant="outlined" color="primary1" onClick={handleLogout} fullWidth>
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
