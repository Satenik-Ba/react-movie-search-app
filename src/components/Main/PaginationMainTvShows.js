import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { PagTvShowsAction } from "../redux/pageTvShows";

const useStyles = makeStyles({
  root: {
    width: "31%",
    margin: "auto",
    backgroundColor: "#9826AB",
  },
});

export default function PaginationMainTvShows() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const handleChangeTv = (event, value) => {
    setPage(value);
    dispatch(
      PagTvShowsAction.changeValue({
        pagTvShows: value,
      })
    );
  };

  return (
    <div className={classes.root}>
      <Stack>
        <Pagination
          defaultPage={1}
          count={99}
          color="secondary"
          size="large"
          onChange={handleChangeTv}
        />
      </Stack>
    </div>
  );
}
