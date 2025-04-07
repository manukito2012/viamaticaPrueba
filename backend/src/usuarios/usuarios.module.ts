import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema-users/user.schema';
import { Sesion, SessionSchema } from 'src/auth/dto/sessions';

@Module({
  imports:[ 
    MongooseModule.forFeature([{
      name:User.name,
      schema:UserSchema
    },
    { name: Sesion.name, schema: SessionSchema },])
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
