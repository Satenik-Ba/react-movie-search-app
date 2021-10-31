import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => {
  return {
    root: {
      backgroundColor: "#C52D3D !important",
      color: "white !important",
    },
    caruselFilmsParent: {
      width: "60%",
      margin: "auto",
      paddingTop: "65px",
    },
  };
});

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: "Harry Potter",
    imgPath: "https://wallpapercave.com/wp/wp2763337.jpg",
  },
  {
    label: "Pirates of the caribbean",
    imgPath: "https://wallpapercave.com/wp/wp1978610.jpg",
  },
  {
    label: "Harry Potter two",
    imgPath:
      "https://i.pinimg.com/originals/2f/35/9a/2f359a14af5d4ef9417b0688286986e5.jpg",
  },
  {
    label: "Vikings",
    imgPath: "https://wallpapercave.com/wp/wp7922033.jpg",
  },
  {
    label: "Game Of Thronse",
    imgPath: "https://wallpaperaccess.com/full/3309220.jpg",
  },
];

function CarouselFilms() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.caruselFilmsParent}>
      <Box sx={{ maxWidth: "100%", flexGrow: 1 }}>
        <Paper
          className={classes.root}
          square
          elevation={0}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 50,
            pl: 2,
            bgcolor: "background.default",
          }}
        >
          <Typography>{images[activeStep].label}</Typography>
        </Paper>
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {images.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    maxHeight: 400,
                    display: "block",
                    overflow: "hidden",
                    width: "100%",
                  }}
                  src={step.imgPath}
                  alt={step.label}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          className={classes.root}
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              className={classes.root}
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              className={classes.root}
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box>
    </div>
  );
}

export default CarouselFilms;
