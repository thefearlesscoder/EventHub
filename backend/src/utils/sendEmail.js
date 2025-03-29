
import nodeMailer from "nodemailer";

export const sendEmail = async ({ email, subject, htmlContent, }) => {
  try {

    console.log("hgjckdsbjfvh");
    
    const transporter = nodeMailer.createTransport({
      host: process.env.SMTP_HOST,
      service: process.env.SMTP_SERVICE,
      port: process.env.SMTP_PORT, 
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    console.log("hgjckdsbjfvhfzghjgk");

    const options = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: subject,
      html: htmlContent,
   
      
    };
    console.log("xasghfg:",options);
    
    await transporter.sendMail(options);
    console.log("Mail sent successfully");
  } catch (error) {
    console.error("Couldn't send mail:", error);
 
  }
};
