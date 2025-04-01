import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserSchema } from './schema-users/user.schema';
import { Model } from 'mongoose';
import { hash } from 'bcrypt'

@Injectable()
export class UsuariosService {

  constructor(@InjectModel(User.name) private userModel: Model<UserSchema>) {

  }


  async create(createUserDto: CreateUsuarioDto) {

    try {

      // Generación del correo
      let generarEmail = this.generateEmail(createUserDto.nombre, createUserDto.apellido);

      // Verificar si el correo ya existe en la base de datos
      let existingUser = await this.userModel.findOne({ email: generarEmail });
      let counter = 1;

      // Si el correo ya existe, agregar un número al final
      while (existingUser) {
        generarEmail = this.generateEmail(createUserDto.nombre, createUserDto.apellido, counter);
        existingUser = await this.userModel.findOne({ email: generarEmail });
        counter++;
      }
      // Asignamos el correo generado al DTO
      createUserDto.email = generarEmail; 


      const { password } = createUserDto;
      const plainTohash = await hash(password, 10);
      createUserDto = { ...createUserDto, password: plainTohash };

      const userCreated = await this.userModel.create(createUserDto);
      console.log("usuario creado")
      console.log(userCreated);
      return {
        ...userCreated.toObject(),
        email: generarEmail,
      };
    }
    catch (error) {
      if (error.code === 11000) {
        console.log("error de correo ya esta registrado ", error)

      }
      throw error;

    }

  }

  //generador de email con el nombre ,apellido y identificacion
  private generateEmail(nombre: string, apellido: string, counter: number = 0): string {
    const primercaracterName = nombre.charAt(0).toLowerCase();
    const formattedApellido = apellido.replace(/\s+/g, '').toLowerCase();
    let email = `${primercaracterName}${formattedApellido}@mail.com`;

    if (counter > 0) {
      email = `${primercaracterName}${formattedApellido}${counter}@mail.com`;
    }

    return email;
  }





  findAll() {
    return `This action returns all usuarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }


  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
