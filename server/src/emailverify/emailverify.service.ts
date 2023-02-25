import { BadRequestException, Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { MailerService } from '@nestjs-modules/mailer';
import { UserService } from 'src/user/user.service';

@Injectable()
export class EmailverifyService {
  constructor(
    private mailerService: MailerService,
    private userService: UserService,
  ) {}
  async sendEmailVerify(email: string, lastName: string) {
    const payload = { email };

    const token = await sign(
      payload,
      process.env.JWT_VERIFICATION_TOKEN_SECRET,
      {
        expiresIn: '600s',
      },
    );

    const url = `${process.env.EMAIL_CONFIRMATION_URL}/${token}`;

    return this.mailerService
      .sendMail({
        to: email,
        from: 'quocldgcd191316@fpt.edu.vn',
        subject: 'Welcome to Idiea App',
        text: 'Welcome',
        html: `<b>Welcome to IdieaApp</b></br><p>Hi ${lastName}, Let's confirm your email address.</p></br><a href="${url}">Cofirm Email Address</a>`,
      })
      .then(() => {})
      .catch(() => {});
  }

  async confirmVerify(email: string) {
    const user = this.userService.findByEmail(email);
    if ((await user).isEmailValidated) {
      throw new BadRequestException('Email already confirmed');
    }
    return this.userService.markEmailAsConfirmed(email);
  }

  async decodeConfirmationToken(token: string) {
    try {
      const payload = verify(token, process.env.JWT_VERIFICATION_TOKEN_SECRET);

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }
}
