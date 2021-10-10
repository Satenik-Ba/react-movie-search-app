import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => {
  return {
    root: {
      backgroundColor: "#171c2c !important",
      color: "#d1d2d6 !important",
    },
  };
});

function CategoryFilms() {
  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
      <Box sx={{ minWidth: 50 }}>
        <FormControl fullWidth>
          <InputLabel className={classes.root} id="demo-simple-select-label">
            Category
          </InputLabel>
          <Select
            className={classes.root}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Films"
            onChange={handleChange}
          >
            <MenuItem value={10}>Biography</MenuItem>
            <MenuItem value={20}>Horror</MenuItem>
            <MenuItem value={30}>Drama</MenuItem>
            <MenuItem value={40}>Melodramma</MenuItem>
            <MenuItem value={50}>Comedy</MenuItem>
            <MenuItem value={60}>Detective</MenuItem>
            <MenuItem value={70}>Crime</MenuItem>
            <MenuItem value={80}>Fantasy</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Typography>
  );
}

export default CategoryFilms;
