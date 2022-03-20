import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import nodemailer from 'nodemailer';
import { compile } from 'handlebars';

import { HttpCode, HttpError } from 'growup-shared';

import { SuccessResponse } from '~/common/models/responses/success';
import { env } from '~/config/env';

const readFile = promisify(fs.readFile);

const sendMail = async (
  host: string,
  email: string,
  token: string,
): Promise<SuccessResponse> => {
  const html = await readFile(
    path.join(__dirname, '..', 'data/local/mail/registration.html'),
    'utf-8',
  );
  const template = compile(html);

  const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: env.email.name,
      pass: env.email.password,
    },
  });

  const url = `http://${host}/registration-complete/${token}`;

  const mail = {
    from: env.email.name,
    to: email,
    subject: 'Complete registration',
    html: template({ url }),
  };

  try {
    await transport.sendMail(mail);
  } catch {
    throw new HttpError({
      status: HttpCode.INTERNAL_SERVER_ERROR,
      message: 'Email can not be sent',
    });
  }

  return { success: true, message: 'Email is sent' };
};

export { sendMail };
