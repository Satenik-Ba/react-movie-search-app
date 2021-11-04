import React, { useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { CatValueAction } from '../redux/categoryValue';
import { CATEGORIES_MOVIES_API } from '../../constants/APIs';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => {
  return {
    root: {
      backgroundColor: '#171c2c !important',
      color: '#d1d2d6 !important',
    },
  };
});

function CategoryFilms() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [age, setAge] = React.useState('Categories');
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
      <FormControl sx={{ m: 1, minWidth: 600 }}>
        <Select
          className={classes.root}
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem
            value="Categories"
            onClick={() => {
              dispatch(
                CatValueAction.changeValue({
                  catValue: '',
                })
              );
            }}
          >
            Categories
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
}
export default CategoryFilms;
