import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const useStyles = makeStyles({
  icon: {
    color: "#C32D3D !important",
  },
});
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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
        size="small"
      />
    </Stack>
  );
}
