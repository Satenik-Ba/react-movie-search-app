import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  icon: {
    color: "#BF3B7C !important",
  },
});

export default function ReitingVideoStars(props) {
  const classes = useStyles();
  return (
    <Stack spacing={1}>
      <Rating
        className={classes.icon}
        name="read-only"
        readOnly
        defaultValue={props.defaultValue / 2}
        precision={0.1}
        size="large"
      />
    </Stack>
  );
}
