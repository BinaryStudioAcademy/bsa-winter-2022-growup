// import nodemailer from 'nodemailer';
import { SuccessResponse } from '~/common/models/responses/success';

const sendMail = async (
  _email: string,
  token: string,
): Promise<SuccessResponse> => {
  // const testAccount = await nodemailer.createTestAccount();

  // const transporter = nodemailer.createTransport({
  //   host: 'smtp.ethereal.email',
  //   port: 587,
  //   secure: false,
  //   auth: {
  //     user: testAccount.user,
  //     pass: testAccount.pass,
  //   },
  // });

  // const info = await transporter.sendMail({
  //   from: '"Test" <no-reply@growup.com>',
  //   to: email,
  //   subject: 'Growup Registration',
  //   html: `
  //   <h1>Hello</h1>
  //   <p>
  //     You've recieved this email, because someone used this email while registrating
  //     on our growup website. If it was you, then confirm and continue your
  //     registration by link http://localhost:3000/signup/${token}
  //   </p>`,
  // });

  console.info(`http://localhost:3000/signup/${token}`);
  // console.info(nodemailer.getTestMessageUrl(info));

  return { success: true, message: 'Email is sent' };
};

export { sendMail };
