import { BadRequestException, Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { MailerService } from '@nestjs-modules/mailer';
import { UserService } from 'src/user/user.service';
import { SendMailNotifyForCreateNewIdieaDto } from './dto/send-mail-notify-for-idiea.input';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { SendMailForPubLishIdieaDto } from './dto/send-mail-notify-for-publish.input';
import { SendNodetifyForCommnentDto } from './dto/send-notify-comment.input';

@Injectable()
export class EmailverifyService {
  constructor(
    private mailerService: MailerService,
    private userService: UserService,
  ) {
    new HandlebarsAdapter(undefined, {
      inlineCssEnabled: true,
      inlineCssOptions: {
        url: ' ',
        preserveMediaQueries: true,
      },
    });
  }
  async sendEmailVerify(email: string, lastName: string) {
    const payload = { email };

    const token = await sign(
      payload,
      process.env.JWT_VERIFICATION_TOKEN_SECRET,
      {
        expiresIn: '600s',
      },
    );

    const url = `${process.env.EMAIL_CONFIRMATION_URL}?token=${token}`;

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

  //Send Mail notify for create idiea

  async sendMailNotifyForCreateNewIdiea(
    sendMailNotifyForCreateNewIdieaDto: SendMailNotifyForCreateNewIdieaDto,
  ) {
    const user = await this.userService.findOne(
      sendMailNotifyForCreateNewIdieaDto.userId,
    );

    if (!user) {
      throw new BadRequestException();
    }

    return this.mailerService
      .sendMail({
        to: user.email,
        from: 'quocldgcd191316@fpt.edu.vn',
        subject: 'CREATE IDIEA SUCCESSFULLY',
        text: 'IdieaApp',
        html: `<b>Congratulations! Your idea has been create and waiting for publish</b></br><p>Hi ${user.lastName}, Summarize your post</p>
        </br><p>Content: ${sendMailNotifyForCreateNewIdieaDto.content}<p>
        </br><p>Close commnet at: ${sendMailNotifyForCreateNewIdieaDto.closeCommentAt}<p>
        </br><p>Close edit at: ${sendMailNotifyForCreateNewIdieaDto.closeIdieaAt}<p>
        `,
      })
      .then(() => {})
      .catch(() => {});
  }

  async sendMailForPublishIdiea(
    sendMailForPubLishIdieaDto: SendMailForPubLishIdieaDto,
  ) {
    const user = await this.userService.findOne(
      sendMailForPubLishIdieaDto.userId,
    );

    if (!user) {
      throw new BadRequestException();
    }

    return this.mailerService
      .sendMail({
        to: user.email,
        from: 'quocldgcd191316@fpt.edu.vn',
        subject: 'IDIEA PUBLISH SUCCESSFULLY',
        text: 'IdieaApp',
        html: `<b>Congratulations! Your idea has been published</b></br><p>Hi ${user.lastName}, Summarize your post</p>
        </br><p>Content: ${sendMailForPubLishIdieaDto.content}<p>
        </br><p>Close commnet at: ${sendMailForPubLishIdieaDto.closeCommentAt}<p>
        </br><p>Close edit at: ${sendMailForPubLishIdieaDto.closeIdieaAt}<p>
        `,
      })
      .then(() => {})
      .catch(() => {});
  }

  async sendNotifyForComment(
    sendNodetifyForCommnentDto: SendNodetifyForCommnentDto,
  ) {
    const idieaOwner = await this.userService.findOne(
      sendNodetifyForCommnentDto.userId,
    );
    const userComment = await this.userService.findOne(
      sendNodetifyForCommnentDto.userCommentId,
    );

    return this.mailerService
      .sendMail({
        to: idieaOwner.email,
        from: 'quocldgcd191316@fpt.edu.vn',
        subject: 'YOUR POST RECIVE A NEW COMMENT',
        text: 'IdieaApp',
        html: `<b>Your post has recive a new commnet</b></br><p>Hi ${idieaOwner.lastName}, Summarize bellow:</p>
        </br><p>Content: ${sendNodetifyForCommnentDto.content}<p>
        </br><p>At: ${sendNodetifyForCommnentDto.createdAt}<p>
        </br><p>By: ${userComment.lastName}<p>
        `,
      })
      .then(() => {})
      .catch(() => {});
  }
}
