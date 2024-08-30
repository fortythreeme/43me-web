'use client';
import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import RTL from '@/app/(DashboardLayout)/layout/shared/customizer/RTL';
import { ThemeSettings } from '@/utils/theme/Theme';
import { store, persistor } from '@/store/store';
import { Notifications } from 'react-push-notification';
import { GetUser, SendNotify } from '@/utils/apiCalls';
import { useSelector, useDispatch } from 'react-redux';
// import { AppState } from "@/store/store";
import { updateDaysLeft } from '@/store/user/userSlice';
import { logout } from '@/store/user/userSlice';
import { Provider } from 'react-redux';
import Script from 'next/script';
import './global.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import '@/app/api/index';
import '@/utils/i18n';
import { NextAppDirEmotionCacheProvider } from '@/utils/theme/EmotionCache';
import 'react-quill/dist/quill.snow.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { PersistGate } from 'redux-persist/integration/react';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';
import initializeFirebaseMessaging from '@/utils/firebase';
import { messaging } from '../../public/firebase-messaging-sw';
import { onMessage } from 'firebase/messaging';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
export const MyApp = ({ children }) => {
  const theme = ThemeSettings();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const customizer = useSelector((state) => state.customizer);
  const user = useSelector((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    initializeFirebaseMessaging();

    // onMessage(messaging,(payload)=>{
    //   console.log(payload);
    // })
    const setupMessaging = async () => {
      const messaging = await initializeFirebaseMessaging();
      if (messaging) {
        // Handle foreground messages
        onMessage(messaging, (payload) => {
          console.log('Message received. ', payload);
          // Customize how you handle the foreground messages here
          // Example: Display a notification
          const notificationTitle = payload.notification.title;
          const notificationOptions = {
            body: payload.notification.body,
            icon: payload.notification.image,
          };

          if (Notification.permission === 'granted') {
            new Notification(notificationTitle, notificationOptions);
          }
        });
      }
    };

    setupMessaging();
  }, []);
  useEffect(() => {
    const tokenFirebase = localStorage.getItem('CurrentToken');
    const targetTime = new Date(localStorage.getItem('mid')).getTime();
    const targetTime1 = new Date(localStorage.getItem('eve')).getTime();
    const targetTime2 = new Date(localStorage.getItem('mor')).getTime();
    const morning = localStorage.getItem('morRemind');
    const midday = localStorage.getItem('midRemind');
    const evening = localStorage.getItem('eveRemind');
    console.log(targetTime1, 'target');
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const currentHoursMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

      const targetHoursMinutes =
        new Date(targetTime).getHours() * 60 + new Date(targetTime).getMinutes();
      const targetHoursMinutes1 =
        new Date(targetTime1).getHours() * 60 + new Date(targetTime1).getMinutes();
      const targetHoursMinutes2 =
        new Date(targetTime2).getHours() * 60 + new Date(targetTime2).getMinutes();
      // console.log(targetTime1,"evening")
      console.log(targetHoursMinutes, currentHoursMinutes, 'hours');
      if (morning && currentHoursMinutes === targetHoursMinutes2) {
        // console.log("first")
        const res = SendNotify(tokenFirebase, '43me', 'Lets Check What to do today!');
        //  console.log(res,'res-data')
      } else if (midday && currentHoursMinutes === targetHoursMinutes) {
        // console.log("first")
        const res = SendNotify(tokenFirebase, '43me', 'Lets Check What to do today!');
        //  console.log(res,'res-data')
      } else if (evening && currentHoursMinutes === targetHoursMinutes1) {
        // console.log("first")
        const res = SendNotify(tokenFirebase, '43me', 'Lets Check What to do today!');
        //  console.log(res,'res-data')
      }
    }, 60000); // Check every minute

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    if (!pathname.startsWith('/payment/success') && !pathname.startsWith('/payment/cancel')) {
      const ftc = async () => {
        // console.log(!pathname.startsWith('/payment/success'),'path')
        const res = await GetUser(user?.currentUser?.token);
        // console.log(res, 'userinfo');
        // console.log(res?.data[0].subscriptions[res?.data[0].subscriptions.length - 1])
        const givenDate = new Date(
          res?.data[0].subscriptions[res?.data[0].subscriptions.length - 1]?.expiry_date,
        );
        const currentDate = new Date();
        const diffTime = givenDate - currentDate;
        const differenceInDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
        // setDaysLeft(differenceInDays);
        // console.log(differenceInDays,'days')
        dispatch(updateDaysLeft(differenceInDays));
        if (
          givenDate < currentDate &&
          res?.data[0].subscriptions[res?.data[0].subscriptions.length - 1]?.status === 'inactive'
        ) {
          dispatch(logout());
          router.replace('/login');
        }
      };
      ftc();
    }
  }, []);
  return (
    <>
      <NextAppDirEmotionCacheProvider options={{ key: 'modernize' }}>
        <ThemeProvider theme={theme}>
          <RTL direction={customizer.activeDir}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {children}
          </RTL>
        </ThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </>
  );
};

export default function RootLayout({ children }) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  // console.log(pathname, 'router');
  React.useEffect(() => {
    setTimeout(() => setLoading(true), 3000);
  }, []);
  const isAuthPage =
    pathname === '/login' || pathname === '/register' || pathname === '/forgot-password';

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* <!-- Google tag (gtag.js) -->  */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-QZCSD8EVYW"></Script>{' '}
        <Script id="google-analytics">
          {' '}
          {`window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);} 
           gtag('js', new Date()); 
           gtag('config', 'G-QZCSD8EVYW'); `}
        </Script>
      </head>
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {isAuthPage ? (
              <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_APP_RECAPTCHA_KEY}>
                <Notifications />
                {loading ? (
                  <MyApp>{children}</MyApp>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      height: '100vh',
                    }}
                  >
                    <CircularProgress />
                  </Box>
                )}
              </GoogleReCaptchaProvider>
            ) : (
              <>
                <Notifications />
                {loading ? (
                  // eslint-disable-next-line react/no-children-prop
                  <MyApp children={children} />
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      height: '100vh',
                    }}
                  >
                    <CircularProgress />
                  </Box>
                )}
              </>
            )}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
