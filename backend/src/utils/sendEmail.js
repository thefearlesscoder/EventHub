import { Resend } from 'resend';

export const sendEmail = async ({ email, subject, htmlContent }) => {
  try {
    // Initialize Resend inside the function so it runs AFTER dotenv is loaded in index.js
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const { data, error } = await resend.emails.send({
      from: 'EventHub <vivek@thefearlesscoder.site>', // Using your new verified custom domain
      to: email,
      subject: subject,
      html: htmlContent,
    });

    if (error) {
      console.error("Resend API Error:", error);
      throw new Error(error.message);
    }

    console.log("Email sent successfully via Resend:", data);
  } catch (error) {
    console.error("Couldn't send mail:", error);
    throw new Error("Email sending failed");
  }
};
