import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import DemoTitle from './DemoTitle';
import Image from 'next/image';

import Demo1 from '../../../../../../public/images/landingpage/demos/demo-main.jpg';
import Demo2 from '../../../../../../public/images/landingpage/demos/demo-dark.jpg';
import Demo3 from '../../../../../../public/images/landingpage/demos/demo-horizontal.jpg';
import Demo4 from '../../../../../../public/images/landingpage/demos/demo-rtl.jpg';

import App1 from '../../../../../../public/images/landingpage/apps/app-calendar.jpg';
import App2 from '../../../../../../public/images/landingpage/apps/app-chat.jpg';
import App3 from '../../../../../../public/images/landingpage/apps/app-contact.jpg';
import App4 from '../../../../../../public/images/landingpage/apps/app-email.jpg';
import App5 from '../../../../../../public/images/landingpage/apps/app-note.jpg';
import App6 from '../../../../../../public/images/landingpage/apps/app-user-profile.jpg';
import App7 from '../../../../../../public/images/landingpage/apps/app-blog.jpg';
import App8 from '../../../../../../public/images/landingpage/apps/app-ticket.jpg';
import App9 from '../../../../../../public/images/landingpage/apps/app-ecommerce-shop.jpg';
import App10 from '../../../../../../public/images/landingpage/apps/app-ecommerce-checkout.jpg';
import App11 from '../../../../../../public/images/landingpage/apps/app-ecommerce-list.jpg';


const demos = [
  {
    link: 'https://modernize-nextjs.adminmart.com/dashboards/modern',
    img: Demo1,
    title: 'Main',
  },
  {
    link: 'https://modernize-nextjs-dark.vercel.app/dashboards/ecommerce',
    img: Demo2,
    title: 'Dark',
  },
  {
    link: 'https://modernize-nextjs-horizontal.vercel.app/dashboards/modern',
    img: Demo3,
    title: 'Horizontal',
  },
  {
    link: '/',
    img: Demo4,
    title: 'RTL-[included with package]',
  },
];

const apps = [
  {
    link: 'https://modernize-nextjs.adminmart.com/apps/calendar',
    img: App1,
    title: 'Calendar App',
  },
  {
    link: 'https://modernize-nextjs.adminmart.com/apps/chats',
    img: App2,
    title: 'Chat App',
  },
  {
    link: 'https://modernize-nextjs.adminmart.com/apps/contacts',
    img: App3,
    title: 'Contact App',
  },
  {
    link: 'https://modernize-nextjs.adminmart.com/apps/email',
    img: App4,
    title: 'Email App',
  },
  {
    link: 'https://modernize-nextjs.adminmart.com/apps/notes',
    img: App5,
    title: 'Note App',
  },
  {
    link: 'https://modernize-nextjs.adminmart.com/apps/user-profile/profile',
    img: App6,
    title: 'User Profile App',
  },
  {
    link: 'https://modernize-nextjs.adminmart.com/apps/blog/post',
    img: App7,
    title: 'Blog App',
  },
  {
    link: 'https://modernize-nextjs.adminmart.com/apps/tickets',
    img: App8,
    title: 'Ticket App',
  },
  {
    link: 'https://modernize-nextjs.adminmart.com/apps/ecommerce/shop',
    img: App9,
    title: 'eCommerce Shop App',
  },
  {
    link: 'https://modernize-nextjs.adminmart.com/apps/ecommerce/checkout',
    img: App10,
    title: 'eCommerce Checkout App',
  },
  {
    link: 'https://modernize-nextjs.adminmart.com/apps/ecommerce/list',
    img: App11,
    title: 'eCommerce List App',
  },
];

const StyledBox = styled(Box)(() => ({
  overflow: 'auto',
  position: 'relative',
  '.MuiButton-root': {
    display: 'none',
  },
  '&:hover': {
    '.MuiButton-root': {
      display: 'block',
      transform: 'translate(-50%,-50%)',
      position: 'absolute',
      left: '50%',
      right: '50%',
      top: '50%',
      minWidth: '100px',
      zIndex: '9',
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: ' 0',
      width: '100%',
      height: '100%',
      zIndex: '8',
      backgroundColor: 'rgba(55,114,255,.2)',
    },
  },
}));

const DemoSlider = () => {
  return (
    <Box
      id="demos"
      pb="140px"
      overflow="hidden"
      sx={{
        pt: {
          sm: '60px',
          lg: '0',
        },
      }}
    >
      <Container maxWidth="lg">
        {/* Title */}
        <DemoTitle />

        {/* demos */}
        <Box mt={9}>
          <Grid container mt={2} spacing={3}>
            {demos.map((demo, index) => (
              <Grid item xs={12} lg={3} key={index}>
                <Box>
                  {/* <Link href={demo.link}> */}
                  <StyledBox>
                    <Image
                      src={demo.img}
                      alt="demo"
                      style={{
                        borderRadius: '8px',
                        width: '100%',
                        height: '100%',
                      }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      href={demo.link}
                      target="_blank"
                    >
                      Live Preview
                    </Button>
                  </StyledBox>
                  {/* </Link> */}
                  <Typography
                    variant="h6"
                    color="textPrimary"
                    textAlign="center"
                    fontWeight={500}
                    mt={2}
                  >
                    {demo.title}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box mb={2} mt={5} textAlign="center">
          <Chip label="Apps" color="primary" />
        </Box>
        {/* apps */}
        <Box>
          <Grid container mt={2} spacing={3}>
            {apps.map((app, index) => (
              <Grid item xs={12} lg={3} key={index}>
                <Box>
                  {/* <Link href={app.link}> */}
                  <StyledBox>
                    <Image
                      src={app.img}
                      alt="app"
                      style={{
                        borderRadius: '8px',
                        width: '100%',
                        height: '100%',
                      }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      href={app.link}
                      target="_blank"
                    >
                      Live Preview
                    </Button>
                  </StyledBox>
                  {/* </Link> */}
                  <Typography
                    variant="h6"
                    color="textPrimary"
                    textAlign="center"
                    fontWeight={500}
                    mt={2}
                  >
                    {app.title}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default DemoSlider;
