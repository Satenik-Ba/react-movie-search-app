import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { PagValueAction } from "../redux/pageValue";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    width: "32%",
    margin: "auto",
    backgroundColor: "#9826AB",
  },
});

export default function PaginationMain() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const pagValue = useSelector((state) => state.pageValue.pagValue);

  const handleChange = (event, value) => {
    dispatch(
      PagValueAction.changeValue({
        pagValue: value,
      })
    );
  };

  return (
    <div className={classes.root}>
      <Stack>
        <Pagination
          page={pagValue}
          defaultPage={1}
          count={99}
          color="secondary"
          size="large"
          onChange={handleChange}
        />
      </Stack>
    </div>
  );
}
