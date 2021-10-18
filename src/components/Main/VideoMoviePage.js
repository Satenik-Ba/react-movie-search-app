import * as React from "react";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  root: {
    color: "red",
  },
});

const VideoMoviePage = ({ title, tvName, image, overview, video }) => {
  const classes = useStyles();

  return (
    <div>
      {title}
      {/* <video width="750" height="500" controls>
        <source src={} type="video/mp4" />
      </video> */}
    </div>
  );
};
export default VideoMoviePage;
