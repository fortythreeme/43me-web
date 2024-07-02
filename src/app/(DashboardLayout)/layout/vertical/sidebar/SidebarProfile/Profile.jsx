import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector,useDispatch } from 'react-redux';
import { IconPower } from '@tabler/icons-react';
import Link from 'next/link';
import { logout } from '@/store/user/userSlice';
import { useRouter } from 'next/navigation';
export const Profile = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const customizer = useSelector((state) => state.customizer);
  const user = useSelector((state) => state.user);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';
  const handleLogout = () =>{
    console.log('hi')
    dispatch(logout());
      // router.replace('/auth/auth1/login');
  }
  return (
    <Box
      display={'flex'}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${'primary1.light'}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar alt="Remy Sharp" src={"/images/profile/user-1.jpg"} sx={{height: 40, width: 40}} />

          <Box>
            <Typography variant="h6" style={{textTransform:"capitalize"}}>{user?.currentUser?.user.first_name}</Typography>
            <Typography variant="caption" style={{textTransform:"capitalize"}}>{user?.currentUser?.user.last_name}</Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Logout" placement="top">
              <IconButton
                color="primary1"
                onClick={handleLogout}
                // href="/auth/auth1/login"
                aria-label="logout"
                size="small"
              >
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ''
      )}
    </Box>
  );
};
