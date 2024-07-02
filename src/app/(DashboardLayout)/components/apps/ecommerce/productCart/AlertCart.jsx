import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const AlertCart = ({ text, open,sev }) => {
  const [isOpen, setIsOpen] = useState(false);
// console.log(text,open,'oepn')
console.log("first")
  useEffect(() => {
    setIsOpen(open);
    if (open) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <React.Fragment>
      <Snackbar
        open={isOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={5000}
        onClose={() => setIsOpen(false)} // Close Snackbar when clicking on it
      >
        <Alert severity={sev} variant="filled" sx={{ width: '100%', color: 'white' }}>
         {text}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default AlertCart;
