import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  create(@Body() createAuthDto: LoginAuthDto) {
    return this.authService.login(createAuthDto);
  }

  @Post('logout/:userId')
  async logout(@Param('userId') userId: string) {
    return this.authService.logout(userId);
  }

  @Get('sessions/:userId')
  async getSessions(@Param('userId') userId: string) {
    return this.authService.getSessions(userId);
  }






  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
