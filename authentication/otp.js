const transporter = require("../configuration/nodemailer");
const Usermodel = require('../model/user.model')


async function sendOTP(req, res) {
  const email = await req.body.email;
  const otp = await req.otp;
  try {
    await transporter.sendMail({
      from: "open_store@gmx.com",
      to: `${email}`,
      subject: "Verify OTP",
      // text: "Hello world?", // plain text body
      html: `OTP : ${otp}`,
    });
    await saveOtp(email, otp);
    res.status(200).send("otp send successfully");
  } catch (err) {
    res.status(500).send("unable to send otp");
  }
}

async function saveOtp(email, otp) {
  try {
    const newOtp = Usermodel.Otp({
        email:email,
        otp:otp,
        used:false
      });
      await newOtp.save();
      console.log("otp saved");
  } catch (error) {
    return console.log({ Message: "Error", error });
  }
}

 async function VerifyOtp (req, res) {
  try {
    const { email, otp } = await req.body;
    const otpData = await Usermodel.Otp.findOne({email,otp});
if(!otpData ){
    return res.status(404).send({ message: "OTP is not valid!" });
}else if(otpData.used){
    return res.status(404).send({ message: "This OTP is already used!" });
}
await Usermodel.Otp.findOneAndUpdate(
    { _id: otpData.id },
    { used:true },
  )
res.status(200).send("verification successfully");
  }catch(error){
 res.status(404).send({ message: "Some Internal Error!" });
  }
}

module.exports = {sendOTP,VerifyOtp};
