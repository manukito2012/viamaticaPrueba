import { Controller, Request, Get, Post, Body, Patch, Param, Delete, HttpException, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  //metodo para registrar usuario
  @Post('register')
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }
  //metodo para asignar role
  @Patch('assign-role/:id')
  async assignRole(@Param('id') userId: string, @Body() body: { role: string }) {
    if (!['usuario', 'admin'].includes(body.role)) {
      throw new HttpException('Rol no válido', 400);
    }

    const updatedUser = await this.usuariosService.updateRole(userId, body.role);

    return { message: `Rol cambiado a ${body.role}`, user: updatedUser };
  }
//metodo para ver sesiones de cada usuario
  @Get('sessions/:userId')
  async getSessions(@Param('userId') userId: string) {
    return this.usuariosService.getSessions(userId);
  }

//metodo para ver sesiones
  @Get('sessions/public/:userId')
  async getPublicSessions(@Param('userId') userId: string) {
    return this.usuariosService.getSession(userId);
  }


//metodo para carga masiva d earchivos excel
  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) 
  async bulkUpload(@UploadedFile() file: Express.Multer.File) {
    // Validar si el archivo tiene formato Excel o CSV
    const extname = path.extname(file.originalname).toLowerCase();
    if (extname !== '.xlsx' && extname !== '.csv') {
      throw new HttpException('Solo se permiten archivos Excel (.xlsx) o CSV (.csv)', 400);
    }
    return this.usuariosService.bulkUploadUsers(file);
  }


//metodo para actualizar usuario
  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUsuarioDto,
  ) {
    return this.usuariosService.update(id, updateUserDto);
  }
  
//Busqueda Uusario por Nombre
  @Get('filter')
   async filterUsers(@Query() filterDto: CreateUsuarioDto) {
      return this.usuariosService.filterUsers(filterDto);
    }
  

  @Get()
  async findAll() {
    try {
      const usuarios = await this.usuariosService.verUsuarios();
      return usuarios;
    } catch (error) {
      console.error('Error al acceder a los usuarios:', error.message);
      throw new Error('Error al acceder a los usuarios');
    }
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('ID recibido:', id);  
    return this.usuariosService.findUser(id);
  }

  //Eliminar Usuario por su id
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.usuariosService.remove(id);
    if (result.deletedCount === 0) {
      throw new HttpException('Usuario no encontrado o ya eliminado', 404);
    }
    return { message: 'Usuario eliminado con éxito' };
  }


}
