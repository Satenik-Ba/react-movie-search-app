import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { movieOrShowAction } from "../redux/movie_or_TV_show";

const useStyles = makeStyles(() => {
  return {
    root: {
      backgroundColor: "#171c2c !important",
      color: "#d1d2d6 !important",
    },
  };
});

function AcordionCountryCategories() {
  const dispatch = useDispatch();
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
            Films
          </InputLabel>
          <Select
            className={classes.root}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Films"
            onChange={handleChange}
          >
            <MenuItem
              value={10}
              onClick={() => {
                dispatch(
                  movieOrShowAction.changeValue({
                    movieOrShow: "movies",
                  })
                );
              }}
            >
              Movies
            </MenuItem>
            <MenuItem
              value={20}
              onClick={() => {
                dispatch(
                  movieOrShowAction.changeValue({
                    movieOrShow: "TV Showes",
                  })
                );
              }}
            >
              TV Shows
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Typography>
  );
}

export default AcordionCountryCategories;
