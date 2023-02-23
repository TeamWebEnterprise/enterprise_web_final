import { BadRequestException, Injectable } from '@nestjs/common';
import RefreshToken from './entities/refresh-token.entity';
import { sign, verify } from 'jsonwebtoken';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  private refreshTokens: RefreshToken[] = [];

  constructor(
    private readonly userService: UserService,
    private mailerService: MailerService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);

    if (!user) {
      return null;
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return null;
    }
    return user;
  }

  async refresh(refreshStr: string): Promise<string | undefined> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr);
    if (!refreshToken) {
      return undefined;
    }

    const user = await this.userService.findOne(refreshToken.userId);
    if (!user) {
      return undefined;
    }

    const accessToken = {
      userId: refreshToken.userId,
      roles: refreshToken.roles,
    };

    return sign(accessToken, process.env.ACCESS_SECRET, { expiresIn: '1h' });
  }

  private retrieveRefreshToken(
    refreshStr: string,
  ): Promise<RefreshToken | undefined> {
    try {
      const decoded = verify(refreshStr, process.env.REFRESH_SECRET);
      if (typeof decoded === 'string') {
        return undefined;
      }
      return Promise.resolve(
        this.refreshTokens.find((token) => token.id === decoded.id),
      );
    } catch (e) {
      return undefined;
    }
  }

  async login(
    username: string,
    password: string,
    values: { userAgent: string; ipAddress: string },
  ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
    const user = await this.userService.findByUsername(username);
    return this.newRefreshAndAccessToken(user, values);
  }

  private async newRefreshAndAccessToken(
    user: User,
    values: { userAgent: string; ipAddress: string },
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const refreshObject = new RefreshToken({
      id:
        this.refreshTokens.length === 0
          ? 0
          : this.refreshTokens[this.refreshTokens.length - 1].id + 1,
      ...values,
      userId: user.id,
      roles: user.roles,
    });
    this.refreshTokens.push(refreshObject);

    return {
      refreshToken: refreshObject.sign(),
      accessToken: sign(
        {
          userId: user.id,
          roles: user.roles,
        },
        process.env.ACCESS_SECRET,
        {
          expiresIn: '15m',
        },
      ),
    };
  }

  async logout(refreshStr): Promise<string> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr);

    if (!refreshToken) {
      return;
    }
    // delete refreshtoken from db
    this.refreshTokens = this.refreshTokens.filter(
      (refreshToken) => refreshToken.id !== refreshToken.id,
    );
    return "Logout Success!"
  }

  async sendMailForResetPassword(userId: number) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new BadRequestException();
    }

    const payload = { email: user.email };

    const token = sign(payload, process.env.JWT_RESETPASSWORD_TOKEN_SECRET);

    const url = `${process.env.RESET_PASSWORD_URL}/${token}`;

    return this.mailerService
      .sendMail({
        to: user.email,
        from: 'quocldgcd191316@fpt.edu.vn',
        subject: 'Reset password for IdieaApp acount',
        text: 'Reset password',
        html: `<b>Reset password</b></br><p>Hi ${user.lastName}, Your recently requested to reset your password for your AppIdiea account. Click the button below to reset it..</p></br><a href="${url}">Reset your password</a>`,
      })
      .then(() => {})
      .catch(() => {});
  }
}
