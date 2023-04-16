import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuardApi } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/decorater/roles.decorator';
import { RolesGuard } from 'src/roles.guard';
import { Role } from 'src/user/entities/role.enum';
import { DepartmentService } from './department.service';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}
  @Get('all')
  getAll() {
    return this.departmentService.getAll();
  }

  @Get('all-department-id-published')
  getAllIdieaDepartmentPublished(@Query('departmentid') departmentId: number) {
    return this.departmentService.selectIdieaPublished(departmentId);
  }

  @UseGuards(JwtAuthGuardApi, RolesGuard)
  @Roles(Role.QA_COORDINATOR)
  @Get('all-department-un-published')
  getAllIdieaDepartmentUnPublished(@Req() req) {
    return this.departmentService.selectIdieaUnPublished({
      userId: req.user.userId,
    });
  }
}
