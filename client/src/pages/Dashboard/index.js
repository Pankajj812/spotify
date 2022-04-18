import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Divider, Typography } from "@material-ui/core";
import TypeWriterEffect from "react-typewriter-effect";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { fetchAlbums, resetState } from "../../store/Albums/actions";
import "./styles.css";
import Show from "../../components/show";

const OPTIONS = ["Album", "Artist", "Track Name", "Year", "Genre"];

function Dashboard() {
  const dispatch = useDispatch();
  const [searchParam, setSearchParam] = React.useState({
    type: "track",
    query: "",
  });

  const handleChange = (event) => {
    setSearchParam((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSearch = () => {
    dispatch(resetState());
    dispatch(fetchAlbums(searchParam));
  };

  return (
    <>
      {" "}
      <Box className="outerBox">
        <Box className="innerBox1">
          <Typography className="typo">Search Track by</Typography>
          <TypeWriterEffect
            textStyle={{
              fontSize: "30px",
              fontWeight: 700,
              color: "#fff",
            }}
            startDelay={2000}
            cursorColor="#3F3D56"
            multiText={OPTIONS}
            loop={true}
            nextTextDelay={1000}
            typeSpeed={30}
          />
        </Box>
        <div style={{ display: "flex", paddingTop: "10px" }}>
          <FormControl className="formctrl">
            {/* <InputLabel id="demo-simple-select-label">Type</InputLabel> */}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="type"
              value={searchParam.type}
              onChange={(e) => {
                handleChange(e);
              }}
            >
              {OPTIONS.map((opt) => (
                <MenuItem value={opt?.split(" ")[0].toLowerCase()}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 192,
            }}
            className="paper"
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search here..."
              onChange={(e) => {
                handleChange(e);
              }}
              name="query"
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={handleSearch}
            >
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          </Paper>
        </div>
      </Box>
      <Show searchParam={searchParam} />
    </>
  );
}

export default Dashboard;
