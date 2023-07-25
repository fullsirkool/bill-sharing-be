import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailDto } from './sender.dto';

@Injectable()
export class SenderService {
  constructor() {}

  async sendEmail(data: EmailDto): Promise<void> {
    try {
      // Create a transporter with your Gmail account credentials
      console.log(process.env.MAIL_HOST, process.env.BASE_MAIL, process.env.BASE_MAIL_PASSWORD)
      const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        secure: false,
        auth: {
          user: process.env.BASE_MAIL,
          pass: process.env.BASE_MAIL_PASSWORD,
        },
      });
      const { to, subject, text, html } = data;
      const mailOptions: nodemailer.SendMailOptions = {
        from: process.env.BASE_MAIL,
        to,
        subject,
        text,
        html,
      };
      // Send the email
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
