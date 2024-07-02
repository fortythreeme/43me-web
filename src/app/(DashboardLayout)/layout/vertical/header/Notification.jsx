import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import * as dropdownData from './data';
import Scrollbar from '@/app/(DashboardLayout)/components/custom-scroll/Scrollbar';

import { IconBellRinging } from '@tabler/icons-react';
import { Stack } from '@mui/system';
import Link from 'next/link';

const Notifications = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <Box>
    
    </Box>
  );
};

export default Notifications;
