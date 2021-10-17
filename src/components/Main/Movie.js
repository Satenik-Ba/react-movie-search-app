import * as React from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { makeStyles } from "@mui/styles";
import { lineHeight } from "@mui/system";
import ReactDOM from "react-dom";
const useStyles = makeStyles({
  text: {
    height: "99%",
    overflow: "hidden",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#171C2C",
    position: "absolute",
    opacity: "0",
    "&:hover": {
      opacity: "0.7",
    },
  },
});
const Movie = ({ title, release_date, image, overview }) => {
  const classes = useStyles();
  const onInfoClick = () => {
    // console.log(overview);
    // const element = <div className={classes.text}>{overview}</div>;
    // ReactDOM.render(element, document.document.getElementById("info"));
  };
  return (
    <ImageListItem
      sx={{
        width: "20vw",
        height: 100,
        padding: "5px",
        lineHeight: "1.3 !important",
      }}
      cols={8}
    >
      <div className={classes.text}>{overview}</div>
      <img
        src={"https://image.tmdb.org/t/p/w500/" + image}
        alt=""
        loading="lazy"
      />
      <ImageListItemBar
        title={title}
        actionIcon={
          <IconButton
            sx={{ color: "rgba(255, 255, 255, 0.94)" }}
            aria-label={`info abou`}
            onClick={onInfoClick}
          >
            <InfoIcon />
          </IconButton>
        }
      />
    </ImageListItem>
  );
};
export default Movie;
