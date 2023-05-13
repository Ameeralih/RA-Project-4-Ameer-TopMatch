import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const SearchFilter = ({ onFilter }) => {
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setCurrentSearchQuery(event.target.value);
  };

  const handleFilterButtonClick = () => {
    onFilter(currentSearchQuery);
  };

  return (
    <>
      <TextField
        label="Search by player name"
        value={currentSearchQuery}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
        sx={{
          width: "25%",
          color: "#F5F5F5",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          "& .MuiInputBase-input": {
            color: "#F5F5F5",
          },
          "& .MuiInputLabel-root": {
            color: "#F5F5F5",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#F5F5F5",
            },
            "&:hover fieldset": {
              borderColor: "#F5F5F5",
            },
            "& fieldset": {
              borderColor: "#F5F5F5",
            },
          },
        }}
      />
      <div>
        <Button onClick={handleFilterButtonClick} variant="contained">
          Filter
        </Button>
      </div>
    </>
  );
};

export default SearchFilter;
