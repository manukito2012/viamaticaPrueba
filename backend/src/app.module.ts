import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/viamaticajs'),
    JwtModule.register({
      secret: 'KeyViamatica',
      signOptions: { expiresIn: '1h' },
    }),
    UsuariosModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy,AuthService],
})
export class AppModule {}
