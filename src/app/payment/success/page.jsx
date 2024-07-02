'use client'
import { Box, Typography } from '@mui/material'
import React,{useEffect} from 'react'
// import {useHistory} from 'react-router-dom'; // Assuming you're using react-router-dom for routing
import { useParams } from 'next/navigation'
const Success = () => {
  useEffect(() => {
   
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    if (sessionId) {
      localStorage.setItem('sessionId',sessionId)
      // console.log('Checkout Session ID:', sessionId); // Log the Checkout Session ID to the console
    }
    setTimeout(function() {
      // Close the current tab
      window.close();
    }, 5000);
  }, []);

  return (
    <Box className='successCon'>
        <Box>
            <div className="success-checkmark">
  <div className="check-icon">
    <span className="icon-line line-tip"></span>
    <span className="icon-line line-long"></span>
    <div className="icon-circle"></div>
    <div className="icon-fix"></div>
  </div>
</div></Box>
<Box>
  <Typography className='justifyMiddle'>Thank You, Your Payment is Successful!</Typography>
  <Typography className='justifyMid'>You&apos;ll be automatically redirected back in 5 seconds!</Typography></Box>
    </Box>
  )
}

export default Success