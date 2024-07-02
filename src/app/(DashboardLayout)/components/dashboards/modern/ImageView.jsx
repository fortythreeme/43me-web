import React from 'react'
import { Dialog, DialogContent, TextField } from '@mui/material';

const ImageView = ({item,open,onClose}) => {
  return (
    <Dialog open={open} onClose={onClose}>
        <DialogContent className='imgViewDiv'>
            <img src={item} className='imgView' />        </DialogContent>
        </Dialog>
  )
}

export default ImageView