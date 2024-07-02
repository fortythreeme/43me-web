import { Box, List, ListItem,ListItemText,Typography } from '@mui/material'
import React from 'react'
import * as dropdownData from '../../layout/vertical/header/data'
import Link from 'next/link'
import { Stack } from '@mui/system';

import Avatar from '@mui/material/Avatar';
const FirstSet = () => {
  return (
    <Box style={{marginLeft:"25px"}}>
      <Box >
    <Box sx={{ py: 2, px: 0 }} className="hover-text-primary" onClick={() => window.location = 'mailto:mail@fortythree.me?subject:fourtythree.me Feedback'}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            width="45px"
            height="45px"
            bgcolor="primary1.light"
            display="flex"
            alignItems="center"
            justifyContent="center" flexShrink="0"
          >
            <Avatar
              src='/images/svgs/icon-account.svg'
              alt='/images/svgs/icon-account.svg'
              sx={{
                width: 24,
                height: 24,
                borderRadius: 0,
              }}
            />
          </Box>
          <Box className='Center'>
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
              Contact
            </Typography>
            
          </Box>
        </Stack>
      {/* </Link> */}
    </Box>
  </Box>

        {dropdownData.settings.map((settings) => (
          <Box key={settings.title}>
            <Box sx={{ py: 2, px: 0 }} className="hover-text-primary">
              <Link href={settings.href} target='_blank'>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    width="45px"
                    height="45px"
                    bgcolor="primary1.light"
                    display="flex"
                    alignItems="center"
                    justifyContent="center" flexShrink="0"
                  >
                    <Avatar
                      src={settings.icon}
                      alt={settings.icon}
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: 0,
                      }}
                    />
                  </Box>
                  <Box className='Center'>
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
                      {settings.title}
                    </Typography>
                    
                  </Box>
                </Stack>
              </Link>
            </Box>
          </Box>
        ))}
    </Box>
  )
}

export default FirstSet