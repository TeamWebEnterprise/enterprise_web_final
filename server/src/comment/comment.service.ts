import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddComment, UpdateComment } from './dto';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) {}
  async addComment(addComment: AddComment, userId: number) {
    const createComment = await this.prismaService.comment.create({
      data: {
        ...addComment,
        userId,
      },
    });
    return createComment;
  }
  async getACommentById(commentId: number) {
    const getCommentById = await this.prismaService.comment.findUnique({
      where: { id: commentId },
    });
    return getCommentById;
  }
  async listComments(idieaId: number, params: { skip?: number; take?: number }) {
    const { skip, take } = params;
    const findNoteById = await this.prismaService.idiea.findUnique({
      where: {
        id: idieaId,
      },
    });
    if (!findNoteById) {
      throw new ForbiddenException('can not found blog');
    }
    const getAllCommentInAIdea = await this.prismaService.comment.findMany({
      where: {
        idieaId,
      },
      skip,
      take,
    });
    return getAllCommentInAIdea;
  }
  async updateComment(commentId: number, updateComment: UpdateComment) {
    const getCommentById = await this.prismaService.comment.findUnique({
      where: { id: commentId },
    });
    if (!getCommentById) {
      throw new ForbiddenException('can not found comment');
    }
    const UpdateComment = await this.prismaService.comment.update({
      where: { id: commentId },
      data: {
        ...updateComment,
      },
    });
    return 'update successfully';
  }
  async deleteComment(commentId: number) {
    const getIdComment = await this.prismaService.comment.findUnique({
      where: { id: commentId },
    });
    if (!getIdComment) {
      throw new ForbiddenException('can not found comment');
    }
    const deleteCommentById = await this.prismaService.comment.delete({
      where: { id: commentId },
    });
    return 'delete successfully';
  }
}
