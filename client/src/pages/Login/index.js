import { Box, Button, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/Auth/actions";
import { tokenSelector } from "../../store/Auth/selector";

import "./styles.css";

function Login() {
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);

  const handleLogin = () => {
    dispatch(login());
  };

  useEffect(() => {
    if (token.success && token.url) {
      window.open(token.url,"_self");
    }
  }, [token]);

  return (
    <Box className="box">
      <Box className="innerBox">
        <Typography variant="h4" className="loginTypo">
          Find. Play. Enjoy.
        </Typography>
        <Button className="button" aria-label="delete" onClick={handleLogin}>
          Login
          <LoginIcon style={{ color: "#1DB954" }} />
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
