import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { getAuth } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;

if (user !== null) {
  user.providerData.forEach((profile) => {
    console.log("Sign-in provider: " + profile.providerId);
    console.log("  Provider-specific UID: " + profile.uid);
    console.log("  Name: " + profile.displayName);
    console.log("  Email: " + profile.email);
    console.log("  Photo URL: " + profile.photoURL);
  });
}
function UserPage() {

  return (
    <React.Fragment>
      <Container minwidth="xl" disableGutters={true} >
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
