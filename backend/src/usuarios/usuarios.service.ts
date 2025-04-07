import { BadRequestException, ConflictException, HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserSchema } from './schema-users/user.schema';
import { Model, Types } from 'mongoose';
import { hash } from 'bcrypt'
import { Sesion, SessionSchema } from 'src/auth/dto/sessions';
import { JwtService } from '@nestjs/jwt';
import * as XLSX from 'xlsx';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';


@Injectable()
export class UsuariosService {

  constructor(@InjectModel(User.name) private userModel: Model<UserSchema>,
    @InjectModel(Sesion.name) private sessionModel: Model<SessionSchema>) {
  }



  //Metodo para crear Usuario
  async create(createUserDto: CreateUsuarioDto) {
    const existingUser = await this.userModel.findOne({ identificacion: createUserDto.identificacion });
    if (existingUser) {
      throw new HttpException('Ya existe una cuenta registrada con esa identificacion.', 400);
    }
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


  //metodo de asignacion
  async updateRole(userId: string, newRole: string) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new HttpException('ID de usuario no válido', 400);
    }
    // Buscar al usuario en la base de datos
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new HttpException('Usuario no encontrado', 404);
    }
    // Cambiar el rol del usuario
    user.role = newRole;
    return user.save();
  }


  // Método para carga masiva de usuarios en archivo excel
  async bulkUploadUsers(file: Express.Multer.File): Promise<{ message: string }> {
    try {
      if (!file) {
        throw new HttpException('No se ha recibido un archivo.', 400);
      }
      // Leer el archivo Excel
      const workbook = XLSX.read(file.buffer, { type: 'buffer' });
      const sheet_name_list = workbook.SheetNames;

      if (!sheet_name_list.length) {
        throw new HttpException('El archivo no contiene hojas de datos.', 400);
      }
      const usersData: any[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
      // Verificación de columnas necesarias
      const requiredColumns = ['nombre', 'apellido', 'identificacion', 'role'];
      const firstRow = usersData[0];
      const missingColumns = requiredColumns.filter(col => !(col in firstRow));
      if (missingColumns.length > 0) {
        throw new HttpException(`Faltan las siguientes columnas en el archivo: ${missingColumns.join(', ')}`, 400);
      }
      // Procesar cada usuario
      for (const [index, data] of usersData.entries()) {
        if (!data.nombre || !data.apellido || !data.identificacion) {
          throw new HttpException(`Faltan datos necesarios en la fila ${index + 1}`, 400);
        }
        // Generar contraseña basada en el nombre del usuario y un número secuencial
        let password = this.generarPassword(data.nombre, index + 1);
        const userData: CreateUsuarioDto = {
          nombre: data.nombre,
          apellido: data.apellido,
          identificacion: data.identificacion.toString(),
          password: password,
          email: data.email || '', // Si no está presente, se asignará después
          role: data.role || 'usuario',
        };
        // Verificar si ya existe un usuario con la misma identificación
        const existingUser = await this.userModel.findOne({ identificacion: userData.identificacion });
        if (existingUser) {
          throw new HttpException(`El usuario con identificación ${userData.identificacion} ya existe`, 400);
        }
        userData.password = await hash(userData.password, 10);
        // Generar un email si no existe en el archivo ya que puede ingresar o no el correo
        if (!userData.email) {
          userData.email = this.generateEmail(userData.nombre, userData.apellido);
        }
        // Si el correo ya existe, generar un nuevo email único
        let counter = 1;
        let generarEmail = userData.email;
        let existingEmail = await this.userModel.findOne({ email: generarEmail });

        while (existingEmail) {
          generarEmail = this.generateEmail(userData.nombre, userData.apellido, counter);
          existingEmail = await this.userModel.findOne({ email: generarEmail });
          counter++;
        }

        userData.email = generarEmail;

        await this.userModel.create(userData);
      }

      // Devolver un objeto JSON con el mensaje de éxito
      return { message: 'Usuarios cargados exitosamente' };

    } catch (error) {
      throw new HttpException(`Error al procesar el archivo de usuarios: ${error.message}`, 500);
    }
  }



  // Método para generar contraseña a partir del nombre y número
  generarPassword(name: string, index: number): string {
    const formattedName = name.toLowerCase().replace(/\s+/g, '');
    return `${formattedName}${index}`;
  }


  // Metodo para actualización de datos de usuarios y admin para usuarios
  async update(id: string, updateUserDto: UpdateUsuarioDto): Promise<User> {
    const userToUpdate = await this.userModel.findById(id);

    if (!userToUpdate) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    if (!updatedUser) {
      throw new NotFoundException(`Usuario con ID ${id} no fue actualizado`);
    }
    return updatedUser;
  }

  //Metodo de busqueda de usuarios por nombre ,apellido, identificacion
  async filterUsers(filterDto: CreateUsuarioDto): Promise<User[]> {
    const filterConditions: any = {};

    if (filterDto.nombre) {
      filterConditions['nombre'] = { $regex: filterDto.nombre.trim(), $options: 'i' };
    }

    if (filterDto.apellido) {
      filterConditions['apellido'] = { $regex: filterDto.apellido.trim(), $options: 'i' };
    }
    if (filterDto.identificacion) {
      filterConditions['numeroIdentificacion'] = filterDto.identificacion;
    }

    console.log('Filtros aplicados:', filterConditions);
    const users = await this.userModel.find(filterConditions).exec();
    console.log('Usuarios encontrados:', users);
    return users;
  }



  //Metodo para ver todo los usuarios solo el admin
  async verUsuarios(): Promise<User[]> {
    try {
      // Intentamos obtener todos los usuarios
      const usuarios = await this.userModel.find();
      return usuarios;
    } catch (error) {
      console.error('Error al obtener los usuarios:', error.message);
      throw new Error('Error al obtener los usuarios');
    }
  }

  //para versesiones usuario
  async getSession(userId: string) {
    return this.sessionModel.find({ userId }).exec();
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

  //ver las sesiones de cada usuario
  async getSessions(userId: string) {
    return this.sessionModel.find({ userId }).exec();
  }

  //ver usuario por id 
  async findUser(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID no válido');
    }

    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }


  // Método para eliminar usuario
  async remove(id: string): Promise<any> {
    // Verificamos si el usuario existe
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    // Realizamos la eliminación física del usuario
    const result = await this.userModel.findByIdAndDelete(id);
  
    if (!result) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado o ya eliminado`);
    }
    return { message: `Usuario con ID ${id} eliminado correctamente` };
  }




}
