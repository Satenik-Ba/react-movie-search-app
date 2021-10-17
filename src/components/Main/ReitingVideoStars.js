import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  icon: {
    color: "#BF3B7C !important",
  },
});

export default function ReitingVideoStars() {
  const classes = useStyles();
  return (
    <Stack spacing={1}>
      <Rating
        className={classes.icon}
        name="size-large"
        defaultValue={2}
        size="large"
      />
    </Stack>
  );
}
