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


  async login(createAuthDto: LoginAuthDto) {
    const { email, password } = createAuthDto;
  
    const findUser = await this.userModel.findOne({ email });
  
    if (!findUser) throw new HttpException('USER_NOT_FOUND :(', 404);
  
    const checkPassword = await compare(password, findUser.password);
    if (!checkPassword) throw new HttpException('PASSWORD_INCORRECTO :(', 403);
  
    // Verificar si ya tiene una sesión activa
    if (findUser.sessionId) {
      throw new HttpException('Ya tienes una sesión activa', 400);
    }
  
    // Generar el sessionId (puede ser un JWT o un identificador único)
    const sessionId = this.jwtService.sign({ userId: findUser._id });
  
    // Registrar la sesión en la base de datos, incluyendo la fecha y hora actual
    const newSession = new this.sessionModel({
      userId: findUser._id,
      event: 'LOGIN',
      times: new Date(), 
    });
    await newSession.save();
  
    // Asignar el sessionId al usuario y guardarlo
    findUser.sessionId = sessionId;
    await findUser.save();
  
    // Generar el token de acceso
    const payload = { id: findUser._id, name: findUser.email };
    const accessToken = this.jwtService.sign(payload);
  
    const data = {
      user: findUser,
      accessToken,
      sessionId
    };
  
    return data;
  }
  



  async logout(userId: string) {
    console.log("Cerrando sesión para el usuario:", userId);
     // Crear el evento de logout
     await this.sessionModel.create({
      userId,
      event: 'LOGOUT',
      timestamp: new Date(),
    });


    await this.userModel.updateOne({ _id: userId }, { $set: { sessionId: null } });
  
    console.log("Sesión cerrada, sessionId eliminado.");
  }


//mostrar
  async getSessions(userId: string) {
    return this.sessionModel.find({ userId }).exec();
  }



  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }


  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
