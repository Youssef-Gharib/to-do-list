import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function MySnackBar({open, message, severity}) {
  return (
    <div>
      <Snackbar open={open} 
                autoHideDuration={2000} 
                // anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
        <Alert
          severity={severity}
          variant="filled"
          sx={{ width: '100%', fontSize:"18px",gap:"10px"}}
        >
            {message}
        </Alert>
      </Snackbar>
    </div>
  );
}