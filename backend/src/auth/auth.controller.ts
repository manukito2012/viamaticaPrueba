import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthGuard } from './guard/auth.guard';
import { AdminGuard } from './guard/admin.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

// CRUD: Login de usuario
  @Post('login')
  create(@Body() createAuthDto: LoginAuthDto) {
    return this.authService.login(createAuthDto);
  }
// CRUD: Logout de usuario
  @Post('logout/:userId')
  async logout(@Param('userId') userId: string) {
    return this.authService.logout(userId);
  }

}
