import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Ip,
  Post,
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

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
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
    return this.userService.createUser(createUserInput);
  }
}
