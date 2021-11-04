import * as React from "react";
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

const useStyles = makeStyles(() => {
  return {
    root: {
      backgroundColor: "#171c2c !important",
      color: "#d1d2d6 !important",
    },
  };
});

function Movie_TVShows() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [age, setAge] = React.useState("Movies");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const onClickMovies = () => {
    dispatch(
      loadingURLAction.changeValue({
        loadingURL: POPULAR_MOVIES_API,
      })
    );
    history.push(HOME_ROUTE);
  };
  const onClickTvShows = () => {
    dispatch(
      loadingURLAction.changeValue({
        loadingURL: POPULAR_TV_SHOWS_API,
      })
    );

    history.push(HOME_ROUTE);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 600 }}>
        <Select
          className={classes.root}
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="Movies" onClick={onClickMovies}>
            Movies
          </MenuItem>
          <MenuItem value={"TV Shows"} onClick={onClickTvShows}>
            TV Shows
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default Movie_TVShows;
