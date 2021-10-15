import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


function UserPage() {
  return (
    <React.Fragment>
      <Container minwidth="xl" disableGutters={true}>
        <Box
          sx={{
            bgcolor: 'red',
            height: '100vh',
            width: '100vw',
          }}
        />
      </Container>
    </React.Fragment>
  );
}

export default UserPage;
