var nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const sendEmail = async (email, subject, payload, template) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ayeshaabbasi433@gmail.com",
        pass: "zwafzljmxedopegn",
      },
    });
    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);
    var mailOptions = {
      from: "ayeshaabbasi433@gmail.com",
      to: "ayeshaabbasi433@gmail.com",
      subject: subject,
      html: compiledTemplate(payload),
    };
    //console.log(mailOptions);
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return error;
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({
          success: true,
        });
      }
    });
  } catch (error) {
    return error;
  }
};

module.exports = sendEmail;
