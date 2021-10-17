import * as React from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import FavoriteVideoIcon from "./FavoriteVideoIcon";
import ReitingVideoStars from "./ReitingVideoStars";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
const useStyles = makeStyles({
  text: {
    height: "90%",
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

const Movie = ({ title, tvName, image, overview }) => {
  const classes = useStyles();
  const onVideoThis = () => {
    console.log(overview);
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
      <ReitingVideoStars />
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
          >
            <FavoriteVideoIcon />
            <PlayCircleOutlineIcon onClick={onVideoThis} />
          </IconButton>
        }
      />
    </ImageListItem>
  );
};
export default Movie;
