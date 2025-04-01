import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema-users/user.schema';

@Module({
  imports:[ 
    MongooseModule.forFeature([{
      name:User.name,
      schema:UserSchema
    }])
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
