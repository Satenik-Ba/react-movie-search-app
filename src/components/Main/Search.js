import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        'background-color': 'white', 
        'color': 'black'
    }, // a style rule 
    label: {}, // a nested style rule
  })
function Search() {
    const classes = useStyles();
  return (
    <div>
      <Box
      className={classes.root}
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="standard-basic" label="Standard" variant="standard" />
      </Box>
    </div>
  );
}

export default Search;
