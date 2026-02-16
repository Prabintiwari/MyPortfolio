import { createTransporter } from "../services/emailService";

export const sendContactNotification = async (contactData: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) => {
  try {
    const transporter = createTransporter();

    const adminMailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: `🔔 New Contact Form Submission: ${
        contactData.subject || "No Subject"
      }`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1>📬 New Contact Form Submission</h1>
            <p>Someone just reached out via your portfolio!</p>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            
            <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #667eea;">
              <span style="font-weight: bold; color: #667eea; display: block; margin-bottom: 5px;">👤 Name:</span>
              <span style="color: #333;">${contactData.name}</span>
            </div>
            
            <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #667eea;">
              <span style="font-weight: bold; color: #667eea; display: block; margin-bottom: 5px;">📧 Email:</span>
              <span style="color: #333;">
                <a href="mailto:${contactData.email}">${contactData.email}</a>
              </span>
            </div>
            
            ${
              contactData.subject
                ? `
              <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #667eea;">
                <span style="font-weight: bold; color: #667eea; display: block; margin-bottom: 5px;">📝 Subject:</span>
                <span style="color: #333;">${contactData.subject}</span>
              </div>
            `
                : ""
            }
            
            <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #667eea;">
              <span style="font-weight: bold; color: #667eea; display: block; margin-bottom: 5px;">💬 Message:</span>
              <div style="background: white; padding: 20px; margin: 15px 0; border-radius: 5px; border: 1px solid #ddd; white-space: pre-wrap;">
                ${contactData.message}
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
              <p>This email was sent from your portfolio contact form.</p>
              <p>Reply directly to 
                <a href="mailto:${contactData.email}">${contactData.email}</a> 
                to respond.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const autoReplyOptions = {
      from: process.env.SMTP_USER,
      to: contactData.email,
      subject: "✅ Thank you for contacting me!",
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1>👋 Hi ${contactData.name}!</h1>
            <p>Thank you for reaching out</p>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            
            <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <p>I've received your message and I'll get back to you as soon as possible.</p>
              <p>Here's a copy of what you sent:</p>
              
              <blockquote style="border-left: 4px solid #667eea; padding-left: 15px; margin: 20px 0;">
                <strong>Subject:</strong> ${
                  contactData.subject || "No subject"
                }<br>
                <strong>Message:</strong><br>
                ${contactData.message}
              </blockquote>
              
              <p>I typically respond within 24-48 hours on business days.</p>
            </div>
            
            <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
              <p>Best regards,<br>
              <strong>${process.env.ADMIN_NAME}</strong></p>
              <p>MERN Stack Developer</p>
              <p>
                <a href="mailto:${process.env.ADMIN_EMAIL}">
                  ${process.env.ADMIN_EMAIL}
                </a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // send both emails
    await transporter.sendMail(adminMailOptions);

    if (process.env.SEND_AUTO_REPLY === "true") {
      await transporter.sendMail(autoReplyOptions);
    }

    return {
      success: true,
      message: "Notification emails sent successfully",
    };
  } catch (error: any) {
    console.error("Email sending error:", error);
    return {
      success: false,
      message: "Failed to send email notification",
      error: error.message,
    };
  }
};
