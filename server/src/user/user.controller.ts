import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from 'src/decorater/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles.guard';
import { Role } from './entities/role.enum';
import { UpdateUserDto } from './dto/update-user-admin.input';
import { SetQAManagerDto } from './dto/set-qa-manager.input';
import { SetUserDepartmentDto } from './dto/set-user-department.input';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('users')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMINSTRATOR)
  async findAll(@Req() req) {
    return this.userService.findAll();
  }

  @Post('update')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMINSTRATOR)
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUserAdmin(updateUserDto);
  }

  @Post('delete')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMINSTRATOR)
  async deleteUser(@Body() { userId }) {
    return this.userService.deleteUserByAmin(userId);
  }

  @Post('set-qa-manager')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMINSTRATOR)
  async setQAManager(@Body() setQAManagerDto: SetQAManagerDto) {
    return this.userService.setQAManager(setQAManagerDto);
  }

  @Post('set-qa-coordinator')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMINSTRATOR)
  async setQACoordinator(@Body() setQAManagerDto: SetQAManagerDto) {
    return this.userService.setQACoordinator(setQAManagerDto);
  }

  @Post('update-user-department')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMINSTRATOR, Role.QA_MANAGER)
  setUserDepartment(@Body() setUserDepartmentDto: SetUserDepartmentDto) {
    return this.userService.setUserDepartment(setUserDepartmentDto);
  }
}
