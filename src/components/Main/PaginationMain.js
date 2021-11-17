import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { PagValueAction } from "../redux/pageValue";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#C52D3D",
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
    
    <Stack sx={{ padding: "30px" }}>
      <Pagination
        page={pagValue}
        defaultPage={1}
        count={500}
        color="standard"
        size="large"
        sx={{
          backgroundColor: "#C52D3D",
          margin: "auto",
        }}
        onChange={handleChange}
      />
    </Stack>

  );
}
