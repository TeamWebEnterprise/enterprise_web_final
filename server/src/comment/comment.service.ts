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
  async listComments(idieaId: number, params: { take?: number }) {
    const { take } = params;
    const findNoteById = await this.prismaService.idiea.findUnique({
      where: {
        id: idieaId,
      },
    });
    if (!findNoteById) {
      throw new ForbiddenException('can not found blog');
    }
    const getAllComments = await this.prismaService.comment.findMany({
      // include lay nhung bang lien ket
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      where: {
        idieaId,
      },
      take,
    });
    await getAllComments.forEach((x) => {
      if (x.anonymous) {
        x.user.username = 'anonymous';
      }
    });
    return getAllComments;
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
