import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { CatValueAction } from "../redux/categoryValue";

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
  const [categoryId, setCategoryId] = React.useState(false);
  const [age, setAge] = React.useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  // const changeCatValue = (value) => {
  //   dispatch(
  //     CatValueAction.changeValue({
  //       catValue: '28',
  //     })
  //   );
  // };

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
            <MenuItem
              value={0}
              onClick={() => {
                dispatch(
                  CatValueAction.changeValue({
                    catValue: false,
                  })
                );
              }}
            >
              All categories
            </MenuItem>
            <MenuItem
              value={28}
              onClick={() => {
                dispatch(
                  CatValueAction.changeValue({
                    catValue: "28",
                  })
                );
              }}
            >
              Action
            </MenuItem>
            <MenuItem
              value={12}
              onClick={() => {
                dispatch(
                  CatValueAction.changeValue({
                    catValue: "12",
                  })
                );
              }}
            >
              Adventure
            </MenuItem>
            <MenuItem
              value={16}
              onClick={() => {
                dispatch(
                  CatValueAction.changeValue({
                    catValue: "16",
                  })
                );
              }}
            >
              Animation
            </MenuItem>
            <MenuItem
              value={35}
              onClick={() => {
                dispatch(
                  CatValueAction.changeValue({
                    catValue: "35",
                  })
                );
              }}
            >
              Comedy
            </MenuItem>
            <MenuItem
              value={80}
              onClick={() => {
                dispatch(
                  CatValueAction.changeValue({
                    catValue: "80",
                  })
                );
              }}
            >
              Crime
            </MenuItem>
            <MenuItem
              value={99}
              onClick={() => {
                dispatch(
                  CatValueAction.changeValue({
                    catValue: "99",
                  })
                );
              }}
            >
              Documentary
            </MenuItem>
            <MenuItem
              value={18}
              onClick={() => {
                dispatch(
                  CatValueAction.changeValue({
                    catValue: "18",
                  })
                );
              }}
            >
              Drama
            </MenuItem>
            <MenuItem
              value={10751}
              onClick={() => {
                dispatch(
                  CatValueAction.changeValue({
                    catValue: "10751",
                  })
                );
              }}
            >
              Family
            </MenuItem>
            <MenuItem
              value={14}
              onClick={() => {
                dispatch(
                  CatValueAction.changeValue({
                    catValue: "14",
                  })
                );
              }}
            >
              Fantasy
            </MenuItem>
            <MenuItem
              value={36}
              onClick={() => {
                dispatch(
                  CatValueAction.changeValue({
                    catValue: "36",
                  })
                );
              }}
            >
              History
            </MenuItem>
            <MenuItem
              value={27}
              onClick={() => {
                dispatch(
                  CatValueAction.changeValue({
                    catValue: "27",
                  })
                );
              }}
            >
              Horror
            </MenuItem>
            <MenuItem
              value={10402}
              onClick={() => {
                dispatch(
                  CatValueAction.changeValue({
                    catValue: "10402",
                  })
                );
              }}
            >
              Music
            </MenuItem>
            <MenuItem
              value={9648}
              onClick={() => {
                dispatch(
                  CatValueAction.changeValue({
                    catValue: "9648",
                  })
                );
              }}
            >
              Mystery
            </MenuItem>
            <MenuItem
              value={10749}
              onClick={() => {
                dispatch(
                  CatValueAction.changeValue({
                    catValue: "10729",
                  })
                );
              }}
            >
              Romance
            </MenuItem>
            <MenuItem
              value={878}
              onClick={() => {
                dispatch(
                  CatValueAction.changeValue({
                    catValue: "878",
                  })
                );
              }}
            >
              Science Fiction
            </MenuItem>
            <MenuItem
              value={10770}
              onClick={() => {
                dispatch(
                  CatValueAction.changeValue({
                    catValue: "10770",
                  })
                );
              }}
            >
              TV Movie
            </MenuItem>
            <MenuItem
              value={53}
              onClick={() => {
                dispatch(
                  CatValueAction.changeValue({
                    catValue: "53",
                  })
                );
              }}
            >
              Thriller
            </MenuItem>
            <MenuItem
              value={10752}
              onClick={() => {
                dispatch(
                  CatValueAction.changeValue({
                    catValue: "10752",
                  })
                );
              }}
            >
              War
            </MenuItem>
            <MenuItem
              value={37}
              onClick={() => {
                dispatch(
                  CatValueAction.changeValue({
                    catValue: "37",
                  })
                );
              }}
            >
              Western
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Typography>
  );
}

export default CategoryFilms;
