"use client"
import Link from 'next/link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import Logo from '@/app/(DashboardLayout)/layout/shared/logo/Logo';
import AuthLogin from '../auth/authForms/AuthLogin';
import Image from 'next/image';

export default function Login () {
  // console.log(process.env.NEXT_PUBLIC_APP,'test')
  return(
  <PageContainer title="Login Page" description="this is Sample page">
    <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={12}
        sm={12}
        lg={7}
        xl={8}
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
              '@media (max-width:600px)': {
                height:0
              }
        }}
      >
        <Box position="relative">
          <Box px={3}>
            <Logo />
          </Box>
          <Box
            alignItems="center"
            justifyContent="center"
            height={'calc(100vh - 75px)'}
            sx={{
              display: {
                xs: 'none',
                lg: 'flex',
              },
              '@media (max-width:600px)': {
                height:0
              }
            }}
            
          >
            <Image
              src={"/images/backgrounds/login-bg.svg"}
              alt="bg" width={500} height={500}
              style={{
                width: '100%',
                maxWidth: '500px',
                maxHeight: '500px',
              }}
            />
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        lg={5}
        xl={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ 
          '@media (max-width:600px)': {
          alignItems:"center",
          marginTop:"-50%"
        }}}
      >
        <Box p={4} style={{width:'80%'}}>
          <AuthLogin
            title="Welcome to 43me"
            subtext={
              <Typography variant="subtitle1" color="textSecondary" mb={1}>
                Your 43me Dashboard
              </Typography>
            }
            subtitle={
              <Stack direction="row" spacing={1} mt={3}>
                <Typography color="textSecondary" variant="h6" fontWeight="500">
                  New to 43me?
                </Typography>
                <Typography
                  component={Link}
                  href="/register"
                  fontWeight="500"
                  sx={{
                    textDecoration: 'none',
                    color: 'primary1.main',
                  }}
                >
                  Create an account
                </Typography>
              </Stack>
            }
          />
        </Box>
      </Grid>
    </Grid>
  </PageContainer>
)};

Login.layout = "Blank";

