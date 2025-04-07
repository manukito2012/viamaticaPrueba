import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/usuarios/schema-users/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { Sesion, SessionSchema } from './dto/sessions';
import { JwtStrategy } from './jwt.strategy';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Module({
  imports: [ 
     // Importa los esquemas de Mongoose para User y Sesion
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Sesion.name, schema: SessionSchema },
    ]),
    JwtModule.register({
      global: true,
      secret: 'KeyViamatica',
      signOptions: { expiresIn: '20h' },
    }),
  ],
  exports: [MongooseModule],
  controllers: [AuthController],
  providers: [AuthService ,JwtStrategy, UsuariosService],
})
export class AuthModule {}

