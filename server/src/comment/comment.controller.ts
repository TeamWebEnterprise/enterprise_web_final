import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { AddComment, PaginationParams, UpdateComment } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuardApi } from '../auth/guards/jwt-auth.guard';
import { Role } from '../user/entities/role.enum';
import { Exception } from 'handlebars';

const _recordsPerPage = 5;
@UseGuards(JwtAuthGuardApi)
@Controller('comment')
export class CommentController {
  constructor(
    private commentService: CommentService,
    private prismService: PrismaService,
  ) {}

  @Post('add')
  async addComment(@Body() addComment: AddComment, @Req() req) {
    const id: number = req.user.userId;
    return await this.commentService.addComment(addComment, id);
  }
  @Get('/list')
  async getAllComments(
    @Query('id', ParseIntPipe) idieaId: number,
    @Query('amount', ParseIntPipe) amount: number,
    @Req() req,
    @Query()
    { take = amount * _recordsPerPage }: PaginationParams,
  ) {
    try {
      return await this.commentService.listComments(idieaId, { take });
    } catch (e) {
      throw new ForbiddenException('can not found comments');
    }
  }

  @Put('edit')
  async updateComment(
    @Body() updateComment: UpdateComment,
    @Query('id', ParseIntPipe) commentId: number, // note
    @Req() req,
  ) {
    try {
      const getUserId = await this.commentService.getACommentById(commentId);
      const userId: number = req.user.userId;
      const getRole: any = req.user.roles;
      // includes function check
      const check = getRole.includes(Role.ADMINSTRATOR);
      if (userId === getUserId.userId || check) {
        return await this.commentService.updateComment(
          commentId,
          updateComment,
        );
      } else {
        return new Exception(
          'you can not allow to do that because you are not the Author',
        );
      }
    } catch (err) {
      throw new ForbiddenException('can not found comment ');
    }
  }
  @Delete('delete')
  async deleteComment(
    @Query('id', ParseIntPipe) commentId: number,
    @Req() req,
  ) {
    try {
      const getUserId = await this.commentService.getACommentById(commentId);
      const userId: number = req.user.userId;
      const getRole: any = req.user.roles;
      // includes function check
      const check = getRole.includes(Role.ADMINSTRATOR);
      console.log(userId, ' and ', getUserId.userId);
      if (userId === getUserId.userId || check) {
        return await this.commentService.deleteComment(commentId);
      } else {
        return new Exception(
          'you can not allow to do that beacause you are not the Author',
        );
      }
    } catch (err) {
      throw new ForbiddenException('can not found comment');
    }
  }
}
