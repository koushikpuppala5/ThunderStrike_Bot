import fetch from "node-fetch";
import jwt from "jsonwebtoken";
import { setCookie } from "nookies";
import { dashboard } from "../../../../config.json";
import { encode } from "../../../utils/functions";

export default async function handler(req, res) {
  const { query } = req;
  const {
    callbackUrl,
    clientId,
    clientSecret,
    jwtSecret,
    discordApiUrl,
  } = dashboard;

  const code = query.code;

  if (!code) {
    return res.json({ error: "No code was provided", status: "error" });
  }

  const data = await (
    await fetch(
      `${discordApiUrl}oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${callbackUrl}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: "authorization_code",
          code: code,
          redirect_uri: callbackUrl,
          scope: "identify guilds",
        }),
      }
    )
  ).json();

  const token = jwt.sign(data.access_token, jwtSecret);

  const expiresInMilliseconds = data.expires_in * 1000;
  setCookie({ res }, "token", token, {
    expires: new Date(Date.now() + expiresInMilliseconds),
    httpOnly: true,
    path: "/",
    secure: true,
  });

  res.redirect("/dashboard");
}
