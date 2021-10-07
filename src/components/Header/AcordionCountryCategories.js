import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function AcordionCountryCategories() {
  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
      <Box sx={{ minWidth: 50 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Films</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Films"
            onChange={handleChange}
          >
            <MenuItem value={10}>Armenian Films</MenuItem>
            <MenuItem value={20}>Russian Films</MenuItem>
            <MenuItem value={30}>Artasahmanyan Films</MenuItem>
            <MenuItem value={30}>Film Armenian Translate</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Typography>
  );
}

export default AcordionCountryCategories;