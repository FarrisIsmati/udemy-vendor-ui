import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
      <CircularProgress />
    </Box>
  );
}

// Copied from https://mui.com/material-ui/react-progress/