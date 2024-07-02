'use client';
import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { useDispatch } from 'react-redux';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import CustomCheckbox from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomFormLabel';
import IconButton from '@mui/material/IconButton';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AuthSocialButtons from './AuthSocialButtons';
import axios from 'axios';
import { login } from '@/utils/services';
import NoDaysLeft from '@/app/(DashboardLayout)/components/dashboards/modern/NoDaysLeft';
const AuthLogin = ({ title, subtitle, subtext }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const router = useRouter();
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  localStorage.setItem('format', 'DD/MM');
  const { executeRecaptcha } = useGoogleReCaptcha();
  const handleClose = () => {
    setOpen(false);
  };
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  useEffect(() => {
    setIsButtonDisabled(!email || !password || !!emailError);
  }, [email, password, emailError]);
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const currentDate = new Date();
  const handleSignIn = async () => {
    if (!executeRecaptcha) {
      console.error('ReCAPTCHA not available');
      return;
    }

    const gRecaptchaToken = await executeRecaptcha('login');

    console.log(gRecaptchaToken,'gRecaptchaTokenlogin')
    try {
      const data = {
        email: email,
        password: password,
      };
      const response = await login(dispatch, {
        email,
        password,
        isWeb:true,
        recaptchaToken:gRecaptchaToken
      });
      const expiryDate = new Date(response.data.expiry_date);
      // console.log(currentDate,expiryDate, 'res');/

      if (response.errors) {
        setError(response.message);
      }
      if (response.success === true) {
        if (response.data.days_left > 0 && response.data.is_subscribed === true) {
          router.push('/');
        } else {
          setOpen(true);
        }
      } else {
        if (response.errors) {
          setError(response.message);
        }
        console.log(response);
        setError(response.message);
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('Enter a Valid Email');
    }
  };
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };
  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      {/* <AuthSocialButtons title="Sign in with" /> */}
      {/* <Box mt={3}>
      <Divider>
        <Typography
          component="span"
          color="textSecondary"
          variant="h6"
          fontWeight="400"
          position="relative"
          px={2}
        >
          or sign in with
        </Typography>
      </Divider>
    </Box> */}

      <Stack>
        <Box>
          <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
          <CustomTextField
            id="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={handleEmailChange}
            error={!!emailError}
            helperText={emailError}
          />
        </Box>
        <Box>
          <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
          <CustomTextField
            id="password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" style={{ marginLeft: 0 }}>
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          <FormGroup>
            <FormControlLabel
              control={<CustomCheckbox defaultChecked />}
              label="Remember this Device"
            />
          </FormGroup>
          <Typography
            component={Link}
            href="/forgot-password"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary1.main',
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
      </Stack>
      {error !== null ? <Typography className="errorStatement">{error}</Typography> : ''}
      <Box>
        <Button
          color="primary1"
          variant="contained"
          size="large"
          fullWidth
          // component={Link}
          // href="/"
          type="submit"
          onClick={handleSignIn}
          className="hoverPrimary"
          disabled={isButtonDisabled}
        >
          Sign In
        </Button>
      </Box>
      {subtitle}
      <NoDaysLeft open={open} onClose={handleClose} />
    </>
  );
};

export default AuthLogin;
