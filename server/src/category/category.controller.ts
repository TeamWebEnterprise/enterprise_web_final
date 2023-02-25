import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorater/roles.decorator';
import { RolesGuard } from 'src/roles.guard';
import { Role } from 'src/user/entities/role.enum';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.input';
import { UpdateCategoryDto } from './dto/update-category.input';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMINSTRATOR, Role.QA_COORDINATOR, Role.QA_MANAGER)
  @Get('all')
  async getAll() {
    return await this.categoryService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMINSTRATOR, Role.QA_COORDINATOR, Role.QA_MANAGER)
  @Post('create')
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createNewCategory(createCategoryDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMINSTRATOR, Role.QA_COORDINATOR, Role.QA_MANAGER)
  @Post('update')
  updateCategory(@Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.updateCategory(updateCategoryDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMINSTRATOR, Role.QA_COORDINATOR, Role.QA_MANAGER)
  @Post('delete')
  deleteCategory(@Body() { id }) {
    return this.categoryService.deleteCategory(id);
  }
}
