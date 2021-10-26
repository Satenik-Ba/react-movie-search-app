import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { POPULAR_TV_SHOWS_API } from "../../constants/APIs";
import { POPULAR_MOVIES_API } from "../../constants/APIs";
import { loadingURLAction } from "../redux/loadingURL";
import { useHistory } from "react-router-dom";
import { HOME_ROUTE } from "../../constants/routes";
import { PagValueAction } from "../redux/pageValue";

const useStyles = makeStyles(() => {
  return {
    root: {
      backgroundColor: "#171c2c !important",
      color: "#d1d2d6 !important",
    },
  };
});

function AcordionCountryCategories() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const onClickMovies = () => {
    dispatch(
      loadingURLAction.changeValue({
        loadingURL: POPULAR_MOVIES_API,
      })
    );
    //   dispatch(
    //     PagValueAction.changeValue({
    //       pagValue: 1,
    //     })
    //   );
    // };
    history.push(HOME_ROUTE);
  };
  const onClickTvShows = () => {
    dispatch(
      loadingURLAction.changeValue({
        loadingURL: POPULAR_TV_SHOWS_API,
      })
    );
    //   dispatch(
    //     PagValueAction.changeValue({
    //       pagValue: 1,
    //     })
    //   );
    // };

    history.push(HOME_ROUTE);
  };

  return (
    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
      <Box sx={{ minWidth: 50 }}>
        <FormControl fullWidth className={classes.root}>
          <InputLabel className={classes.root} id="demo-simple-select-label">
            Films
          </InputLabel>
          <Select
            className={classes.root}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Films"
            // onChange={handleChange}
          >
            <MenuItem value={10} onClick={onClickMovies}>
              Movies
            </MenuItem>
            <MenuItem value={20} onClick={onClickTvShows}>
              TV Shows
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Typography>
  );
}

export default AcordionCountryCategories;
