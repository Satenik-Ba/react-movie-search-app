import React, { useEffect } from "react";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import InputLabel from "@mui/material/InputLabel";
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

// export let selectedId = 0;

function CategoryFilms() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [age, setAge] = React.useState("Categories");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
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
    <div>
      <FormControl sx={{ m: 1, minWidth: 220 }}>
        <Select
          className={classes.root}
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem
            value="Categories"
            onClick={() => {
              dispatch(
                CatValueAction.changeValue({
                  catValue: "",
                })
              );
            }}
          >
            Category\ies
          </MenuItem>
          {categories.map((category) => (
            <MenuItem
              value={category.id}
              key={category.id}
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
    </div>
  );
  //   return (
  //     <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
  //       <Box sx={{}}>
  //         <FormControl fullWidth>
  //           <InputLabel className={classes.root}>Category</InputLabel>
  //           <Select
  //             className={classes.root}
  //             labelId="demo-simple-select-label"
  //             id="demo-simple-select"

  //             // onChange={handleChange}
  //           >
  //             <MenuItem
  //               value={catName}
  //               onClick={() => {
  //                 dispatch(
  //                   CatValueAction.changeValue({
  //                     catValue: "",
  //                   })
  //                 );
  //               }}
  //             >
  //               {catName}
  //             </MenuItem>
  //             {categories.map((category) => (
  //               <MenuItem
  //                 value={category.id}
  //                 key={category.id}
  //                 onClick={() => {
  //                   dispatch(
  //                     CatValueAction.changeValue({
  //                       catValue: category.id,
  //                     })
  //                   );
  //                 }}
  //               >
  //                 {category.name}
  //               </MenuItem>
  //             ))}
  //           </Select>
  //         </FormControl>
  //       </Box>
  //     </Typography>
  //   );
  // }
}
export default CategoryFilms;
