import { User, UserForgotPassword, Otp } from "../model/user.model.js";
import transporter from "../configuration/nodemailer.js";

async function forgotPassword(req, res) {
  try {
    const email = await req.body.email;
    const otp = await req.otp;
    const checkIsEmailExits = await User.findOne({ email });
    if (checkIsEmailExits) {
      await transporter().sendMail({
        from: "open_store@gmx.com",
        to: `${email}`,
        subject: "Password Reset",
        text: "Reset Password", // plain text body
        html: `
              <!DOCTYPE html>
              <html lang="en">
                <head>
                  <meta charset="UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <title>Password Reset Confirmation</title>
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
                      <h1>Reset Password Confirmation</h1>
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
      const responseData = {
        message: 'Success',
        data:'otp send successfully. this OTP is valid for 5 minutes only'
      }
        res.status(201).json(responseData);
    } else {
      res.status(404).send({ message: "Email does not exits" });
    }
  } catch (err) {
    res.status(500).send("unable to send otp");
  }
}

async function saveOtp(email, otp) {
  try {
    const newOtp = UserForgotPassword({
      email: email,
      otp: otp,
    });
    await newOtp.save();
    console.log("otp saved");
  } catch (error) {
    return console.log({ Message: "Error", error });
  }
}

async function otpverification(req, res) {
  try {
    const { email, otp } = await req.body;
    const otpData = await UserForgotPassword.findOne({ email, otp });
    if (!otpData) {
      return res
        .status(404)
        .json({ message: "OTP is expired or not valid..!" });
    } else if (otpData.used) {
      return res.status(404).json({ message: "This OTP is already used..!" });
    }
    await Otp.findOneAndUpdate({ _id: otpData.id }, { used: true });
    res.status(200).json("verification successfully");
  } catch (error) {
    res.status(404).json({ message: "Some Internal Error!" });
  }
}

async function updatepassword(req,res){
const {otp,email,password} = await req.body
try {
  const otpData = await UserForgotPassword.findOne({ email, otp });
  if (!otpData) {
    return res
      .status(404)
      .send({ message: "OTP is expired or not valid..!" });
  }
  await User.findOneAndUpdate({ email }, { $set: { password: password } });
  res.status(200).json({data:"password changed successfully"});
} catch (error) {
  res.status(404).send({ message: "Some Internal Error!" });
}
}

export { forgotPassword, otpverification,updatepassword };
