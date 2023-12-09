import nodemailer from "nodemailer";

const host = process.env.EMAILHOST;
const port = process.env.EMAILPORT;
const user = process.env.EMAILUSER;
const pass = process.env.EMAILPASSWORD;

const transporter = nodemailer.createTransport({
  host: host,
  port: port,
  auth: {
    user: user,
    pass: pass,
  },
});

export default transporter;
