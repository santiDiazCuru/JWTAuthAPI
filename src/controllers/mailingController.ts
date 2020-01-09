import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";

class MailingController {
  public sendConfirmationEmail(
    confirmationToken: string,
    email: string
  ): string {
    const smtpTrans = nodemailer.createTransport(
      smtpTransport({
        service: "gmail",
        auth: {
          user: "santidiazcurutchet@gmail.com",
          pass: "1896612866santi"
        }
      })
    );

    const mailoutput = `<html>\n\
                        <body>\n\
                        <a href="http://localhost:3000/user/validate/${confirmationToken}">Link</a>\n\
                        </body>\n\
        </html>`;

    const mailOpts = {
      to: `P5_auth <${email}>`,
      subject: "P5 verification email",
      html: mailoutput
    };

    smtpTrans.sendMail(mailOpts, function(error: any) {
      if (error) {
        return console.log(error);
      }
    });
    return "OK";
  }

  public sendForgotPasswordLink(email: string, confirmationToken: string) {
    const smtpTrans = nodemailer.createTransport(
      smtpTransport({
        service: "gmail",
        auth: {
          user: "santidiazcurutchet@gmail.com",
          pass: "1896612866santi"
        }
      })
    );

    const mailoutput = `<html>\n\
                      <body>\n\
                      <a href="http://localhost:3000/user/forgotpassword/${confirmationToken}/${email}">Link</a>\n\
                      <br/>
                      </body>\n\
      </html>`;

    const mailOpts = {
      to: `P5_auth <${email}>`,
      subject: "P5 verification email",
      html: mailoutput
    };

    smtpTrans.sendMail(mailOpts, function(error: any) {
      if (error) {
        return console.log(error);
      }
    });
    return "OK";
  }
}

export default new MailingController();
