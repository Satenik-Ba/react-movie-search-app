import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { CatValueAction } from "../redux/categoryValue";
import { CAREGORIES_MOVIES_API } from "../../constants/APIs";

const useStyles = makeStyles(() => {
  return {
    root: {
      backgroundColor: "#171c2c !important",
      color: "#d1d2d6 !important",
    },
  };
});

export let selectedId = 0;

function CategoryFilms() {
  const classes = useStyles();

  const [age, setAge] = React.useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [categories, setCategories] = React.useState([]);

  useEffect(() => {
    fetch(CAREGORIES_MOVIES_API)
      .then((response) => response.json())
      .then((result) => {
        setCategories(result.genres);
      });
  }, []);

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
            {categories.map((category) => (
              <MenuItem
                value={category.id}
                onClick={() => {
                  dispatch(
                    CatValueAction.changeValue({
                      catValue: category.id,
                    })
                  );
                }}
              >
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Typography>
  );
}

export default CategoryFilms;
