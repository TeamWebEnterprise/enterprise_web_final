import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Ip,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import RefreshTokenDto from './dto/refresh-token.dto';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserInput } from './dto/create-user.input';
import { UserService } from 'src/user/user.service';
import { CheckUserInput } from './dto/check-user.input';
import { Roles } from 'src/decorater/roles.decorator';
import { Role } from 'src/user/entities/role.enum';
import { EmailverifyService } from 'src/emailverify/emailverify.service';
import { JwtAuthGuardApi } from './guards/jwt-auth.guard';
import SetNewPasswordDto from './dto/set-new-password.input';
import { ForGotPassWordDto } from './dto/forgotpassword-user.input';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
    private emailverifyService: EmailverifyService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request, @Ip() ip: string, @Body() body: LoginDto) {
    return this.authService.login(body.username, body.password, {
      ipAddress: ip,
      userAgent: request.headers['user-agent'],
    });
  }

  @Post('checkregister')
  async checkInputRegister(@Body() checkUserInput: CheckUserInput) {
    return this.userService.checkCreateUser(checkUserInput);
  }

  @Post('register')
  async register(@Body() createUserInput: CreateUserInput) {
    console.log(createUserInput);
    await this.userService.createUser(createUserInput);
    await this.emailverifyService.sendEmailVerify(
      createUserInput.email,
      createUserInput.lastName,
    );
    return 'sucessfull!';
  }

  @Post('refresh')
  async refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refresh(body.refreshToken);
  }

  @Post('logout')
  async logout(@Body() body: RefreshTokenDto) {
    return this.authService.logout(body.refreshToken);
  }

  @Post('forgot-password')
  async sendMailForResetPassword(@Body() forGotPassWordDto: ForGotPassWordDto) {
    return this.authService.sendMailForResetPassword(forGotPassWordDto);
  }

  @Post('set-newpassword')
  async setNewPassword(
    @Body() setNewPasswordDto: SetNewPasswordDto,
    @Query('token') token: string,
  ) {
    return await this.userService.setNewPassword(setNewPasswordDto, token);
  }
}
