import nodemailer from "nodemailer";
import { google } from 'googleapis';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

// Use the newer Context type instead of Handler
interface NetlifyEvent {
  httpMethod: string;
  body: string | null;
}

const jsonResponse = (
  body: object | string,
  status: number
): Response => {
  const json =
    typeof body === "string" ? body : JSON.stringify(body);

  return new Response(json, {
    status,
    headers: {
      "Access-Control-Allow-Origin": "https://ashishlimbu.info.np",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
    },
  });
};

const handler = async (event: NetlifyEvent): Promise<Response> => {
  if (event.httpMethod !== "POST") {
    return jsonResponse("Method Not Allowed", 405);
  }

  if (!event.body) {
    return jsonResponse("Missing request body", 400);
  }

  try {
    const { name, email, subject, message } = JSON.parse(event.body);

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID!,
      process.env.GOOGLE_CLIENT_SECRET!,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.USER_MAIL,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    } as SMTPTransport.Options);

    const mailOptions = {
      from: process.env.USER_MAIL,
      to: process.env.USER_MAIL,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return jsonResponse({ success: true, message: "Email sent successfully!" }, 200);
  } catch (error) {
    console.error("Error sending email:", error);
    return jsonResponse({ success: false, error: "Failed to send email" }, 500);
  }
};


export { handler };