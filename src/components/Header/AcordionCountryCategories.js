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
import { movieOrTVAction } from "../redux/movieOrTV";

const useStyles = makeStyles(() => {
  return {
    root: {
      backgroundColor: "#C32D3D!important",
      color: "#d1d2d6 !important",
      borderRadius: "15px !important",
    },
  };
});

function AcordionCountryCategories() {
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
    dispatch(
      movieOrTVAction.changeValue({
        movieOrTV: "movie",
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
    dispatch(
      movieOrTVAction.changeValue({
        movieOrTV: "tv",
      })
    );
    history.push(HOME_ROUTE);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
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

//   return (
//     <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
//       <Box sx={{ minWidth: 50 }}>
//         <FormControl fullWidth className={classes.root}>
//           <InputLabel className={classes.root} id="demo-simple-select-label">
//             Films
//           </InputLabel>
//           <Select
//             // className={classes.root}
//             displayEmpty
//             // id="demo-simple-select"
//             // value={age}
//             label="Films"
//             // onChange={handleChange}
//             inputProps={{ "aria-label": "Without label" }}
//           >
//             <MenuItem value={10} onClick={onClickMovies}>
//               Movies
//             </MenuItem>
//             <MenuItem value={20} onClick={onClickTvShows}>
//               TV Shows
//             </MenuItem>
//           </Select>
//         </FormControl>
//       </Box>
//     </Typography>
//   );
// }

export default AcordionCountryCategories;
