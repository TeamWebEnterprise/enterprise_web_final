import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  private rolePassed: string;
  constructor(role: string) {
    this.rolePassed = role;
  }

  canActivate(context: ExecutionContext): boolean {
    const ctx = context.switchToHttp();
    const request: any = ctx.getRequest();
    console.log('this should pass: ' + this.rolePassed);
    console.log('this user role: ' + request.user.role);
    console.log(request);
    return this.rolePassed === request.user.role;
  }
}
