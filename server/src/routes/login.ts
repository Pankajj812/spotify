import axios, { AxiosResponse } from "axios";
import express, { Request, Response } from "express";
const router = express.Router();

const AUTHORIZE_URI = "https://accounts.spotify.com/authorize?";

export const Login = router.get(
  "/api/login",
  async (req: Request, res: Response) => {
    // var scope = 'user-read-private user-read-email';
    const queryParams = {
      response_type: "code",
      client_id: process.env.CLIENT_ID!,
      scope: process.env.SCOPE!,
      redirect_uri: process.env.REDIRECT_URI!,
      // state: state,
    };
    const queryString = new URLSearchParams(queryParams).toString();
    console.log(`${AUTHORIZE_URI}${queryString}`);

    res
      .status(200)
      .send({ success: true, url: `${AUTHORIZE_URI}${queryString}` });
    // res.redirect(`${AUTHORIZE_URI}${queryString}`);
  }
);

export const Callback = router.get(
  "/api/callback",
  async (req: Request, res: Response) => {
    const { error, code } = req.query as Record<string, string>;
    if (error) {
      throw new Error(`${error}`);
    } else {
      //Make a Post request to Token APIson: true,
      try {
        const authToken = Buffer.from(
          `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`,
          "utf-8"
        ).toString("base64");
        const data = {
          code: code,
          redirect_uri: process.env.REDIRECT_URI!,
          grant_type: "authorization_code",
        };
        const dataString = new URLSearchParams(data).toString();

        const response = await axios.post(
          "https://accounts.spotify.com/api/token",
          dataString,
          {
            headers: {
              Authorization: `Basic ${authToken}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        res.status(200).json({
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
        });
        // res.redirect(
        //   `http://localhost:3000/dashboard?access_token=${response.data.access_token}`
        // );
      } catch (err) {
        res.status(500).send({
          success: false,
          error: err,
        });
      }
    }
  }
);
