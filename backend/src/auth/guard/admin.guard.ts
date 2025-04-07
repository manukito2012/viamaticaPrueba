import { CanActivate, ExecutionContext, Injectable, HttpException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    if (req.user.role !== 'admin') {
      throw new HttpException('No tienes permisos de administrador', 403);
    }
    return true;
  }
}
