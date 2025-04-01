import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/usuarios/schema-users/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt-constant';
import { Sesion, SessionSchema } from './dto/sessions';

@Module({

  imports:[ 
    MongooseModule.forFeature([{
      name:User.name,
      schema:UserSchema
    }]),
    MongooseModule.forFeature([{ 
      name: Sesion.name,
       schema: SessionSchema }]),

    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '20h' },
    }),
  ],
  
  
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
