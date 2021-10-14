var nodemailer = require("nodemailer");

let user = process.env.EMAIL;
let pass = process.env.PASS;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user, pass },
});
const sendEmail = (link, email) => {
  let mailOptions = {
    from: user,
    to: email,
    subject: "Verify Account File Share",
    html: `<h1>Welcome Activate Your Account</h1><br/> <div> <a href="${link}" style="text-decoration:none;color:#000;background:#05cdff;padding:10px 15px;">Verify</a> </div><br/>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
module.exports = sendEmail;
