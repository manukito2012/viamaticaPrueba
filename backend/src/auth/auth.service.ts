import { HttpException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/usuarios/schema-users/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt'
import { Sesion, SessionSchema } from './dto/sessions';


@Injectable()
export class AuthService {

  constructor(@InjectModel(User.name) private userModel: Model<UserSchema>,
    @InjectModel(Sesion.name) private sessionModel: Model<SessionSchema>,
    private jwtService: JwtService) {
  }

  //Metodo para login de usuario
  async login(createAuthDto: LoginAuthDto) {
    const { email, password } = createAuthDto;
  
    const findUser = await this.userModel.findOne({ email });
    if (!findUser) throw new HttpException('USER_NOT_FOUND :(', 404);
    // Verificar si el usuario está bloqueado
    if (findUser.status === 'bloqueado') {
      throw new HttpException('Tu cuenta está bloqueada. Contacta al soporte.', 403);
    }
    // Verificar la contraseña
    const checkPassword = await compare(password, findUser.password);
    if (!checkPassword) {
      // Inicializar el contador de intentos fallidos si no existe
      findUser.failedAttempts = findUser.failedAttempts || 0;
      // Aumentar intentos fallidos
      findUser.failedAttempts += 1;
      // Guardar el intento fallido
      await findUser.save();


      // Si se superan los 3 intentos fallidos, bloquear la cuenta
      if (findUser.failedAttempts >= 3) {
        findUser.status = 'bloqueado';
        await findUser.save();
        throw new HttpException('Usuario bloqueado por múltiples intentos fallidos.', 403);
      }
      throw new HttpException('PASSWORD_INCORRECTO :(', 403);
    }


    // Login exitoso: reiniciar el contador de intentos fallidos
    findUser.failedAttempts = 0;
    await findUser.save();
    if (findUser.sessionId) {
      throw new HttpException('Ya tienes una sesión activa', 400);
    }

    // Generar el sessionId
    const sessionId = this.jwtService.sign({ userId: findUser._id });
   
    const newSession = new this.sessionModel({
      userId: findUser._id,
      event: 'LOGIN',
      times: new Date(),
    });
    await newSession.save();
    // Asignar el sessionId al usuario
    findUser.sessionId = sessionId;
    await findUser.save();

    // Genera el token de acceso
    const payload = { id: findUser._id, name: findUser.email, role: findUser.role };
    const accessToken = this.jwtService.sign(payload);
  
    const data = {
      user: findUser,
      accessToken,
      sessionId,
    };
    return data;
  }
  
//metodo para logout usuario
  async logout(userId: string) {
    await this.sessionModel.create({
      userId,
      event: 'LOGOUT',
      times: new Date(),
    });
    await this.userModel.updateOne({ _id: userId }, { $set: { sessionId: null } });
  }


  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
