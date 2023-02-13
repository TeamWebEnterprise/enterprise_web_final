import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RoleGuard implements CanActivate {
  private rolePassed: string;
  constructor(role: string) {
    this.rolePassed = role;
  }

  canActivate(context: ExecutionContext): boolean {
    const ctx = context.switchToHttp();
    const request: any = ctx.getRequest();
    return this.rolePassed === request.user.role;
  }
}
