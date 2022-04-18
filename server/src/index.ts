import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
import cookieSession from "cookie-session";
import { Callback, Login } from "./routes/login";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "*"
  })
);
app.set("trust-proxy", true);

app.use(json());

app.use(
  cookieSession({
    signed: false, //Disable encryption
    secure: false, // Cookies will only be used on https connection
  })
);

app.use(Login);
app.use(Callback);

app.all("*", () => {
  throw new Error("Specified Route Not Found");
});

const start = async () => {
  app.listen(process.env.PORT || 4000, () => {
    console.log("Listening on Port");
  });
};

start();
