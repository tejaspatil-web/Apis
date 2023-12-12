import transporter from "../configuration/nodemailer.js";
import { Otp } from "../model/user.model.js";

async function sendOTP(req, res) {
  const email = await req.body.email;
  const otp = await req.otp;
  try {
    await transporter.sendMail({
      from: "open_store@gmx.com",
      to: `${email}`,
      subject: "Verification Email",
      text: "Please confirm your OTP", // plain text body
      html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>OTP Confirmation</title>
          <style>
            /* Reset some default styles for email clients */
            body,
            table,
            td,
            th {
              font-family: Arial, sans-serif;
              font-size: 14px;
              line-height: 1.6;
            }
            /* Main email container */
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color:black
            }
            /* Header styles */
            .header {
              background-color: #007bff;
              color: #ffffff;
              text-align: center;
              padding: 20px;
              border-radius: 5px;
            }
            /* Content styles */
            .content {
              padding: 20px;
              text-align: center;
            }
            /* OTP code */
            .otp-code {
              font-size: 24px;
              font-weight: bold;
              color: #007bff;
            }
            /* Call to action button */
            .cta-button {
              display: inline-block;
              background-color: #007bff;
              color: #ffffff;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 5px;
              margin-top: 20px;
            }
      
            .footer {
              padding: 20px;
              text-align: center;
            }

            .color{
              color:white
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>OTP Confirmation</h1>
            </div>
            <div class="content">
              <p class="color">Please confirm your OTP code to continue:</p>
              <p class="otp-code">${otp}</p>
              <p class="color">Use this code within the next 5 minutes.</p>
            </div>
            <hr />
            <div class="footer">
              <p class="color">if this wasn't you, please ignore this email</p>
              <a href="https://ecom-open-store.web.app/">open-store.web.app</a>
            </div>
          </div>
        </body>
      </html>    
    `,
    });
    await saveOtp(email, otp);
    res.statusCode = 200
    res.send(
      "otp send successfully. this OTP is valid for 5 minutes only"
    );
  } catch (err) {
    res.statusCode = 500
    res.send(
      "unable to send otp"
    );
  }
}

async function saveOtp(email, otp) {
  try {
    const newOtp = Otp({
      email: email,
      otp: otp,
    });
    await newOtp.save();
    console.log("otp saved");
  } catch (error) {
    return console.log({ Message: "Error", error });
  }
}

async function VerifyOtp(req, res) {
  try {
    const { email, otp } = await req.body;
    const otpData = await Otp.findOne({ email, otp });
    if (!otpData) {
        res.statusCode = 404
        res.send(
          "OTP is expired or not valid..!"
        );
    } else if (otpData.used) {
      res.statusCode = 404
      res.send(
        "This OTP is already used..!"
      );
    }
    await Otp.findOneAndUpdate({ _id: otpData.id }, { used: true });
    res.statusCode = 200
    res.send(
      "verification successfully"
    );
  } catch (error) {
    res.statusCode = 404
    res.send(
      "Some Internal Error!"
    );
  }
}

export { sendOTP, VerifyOtp };
