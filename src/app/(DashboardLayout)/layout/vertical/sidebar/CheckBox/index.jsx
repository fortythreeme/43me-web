import React,{useState} from 'react'
import Checkbox from '@mui/material/Checkbox'
const CheckBox = ({item, checked, handleChange}) => {
   
  return (
    <div><Checkbox  checked={checked}
    onChange={handleChange}
    inputProps={{ 'aria-label': 'primary checkbox' }} />
    <span>{item.dayName}&nbsp;&nbsp;{item.date}&nbsp;&nbsp;({item.count})</span></div>
  )
}

export default CheckBox