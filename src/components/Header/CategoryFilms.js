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
import { CATEGORIES_MOVIES_API } from "../../constants/APIs";
import PagValueAction from "../redux/pageValue";
import { useSelector } from "react-redux";

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
  const dispatch = useDispatch();

  const [categories, setCategories] = React.useState([]);
  const catName = useSelector((state) => state.categoryValue.catName);
  useEffect(() => {
    fetch(CATEGORIES_MOVIES_API)
      .then((response) => response.json())
      .then((result) => {
        setCategories(result.genres);
      });
  }, []);

  return (
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      <Box sx={{}}>
        <FormControl fullWidth>
          <InputLabel className={classes.root}>Category</InputLabel>
          <Select
            className={classes.root}
            labelId="demo-simple-select-label"
            id="demo-simple-select"

            // onChange={handleChange}
          >
            <MenuItem
              value={catName}
              onClick={() => {
                dispatch(
                  CatValueAction.changeValue({
                    catValue: "",
                  })
                );
              }}
            >
              {catName}
            </MenuItem>
            {categories.map((category) => (
              <MenuItem
                value={category.id}
                key={category.id}
                onClick={() => {
                  dispatch(
                    // PagValueAction.changeValue({
                    //   pagValue: 1,
                    // }),
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
