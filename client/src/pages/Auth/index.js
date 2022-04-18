import React, { useEffect } from "react";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/Auth/actions";
import { tokenSelector } from "../../store/Auth/selector";
import { useNavigate } from "react-router";
import { Box, Typography } from "@material-ui/core";
import LinearBuffer from "../../components/LinearProgress";
import "./styles.css";

function Auth() {
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);
  let navigate = useNavigate();

  const queryParams = queryString.parse(window.location.search);

  useEffect(() => {
    dispatch(login(queryParams));
  }, []);

  useEffect(() => {
    if (token?.access_token) {
      localStorage.setItem("access_token", token.access_token);
      localStorage.setItem("refresh_token", token.refresh_token);
      navigate("/dashboard");
    }
  }, [token]);

  return (
    <Box className="authBox">
      <Typography className="authTypo" variant="h5">Authenticating Please Wait...</Typography>
      <LinearBuffer />
    </Box>
  );
}

export default Auth;
