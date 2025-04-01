import { LoginAuthDto } from './dto/login-auth.dto';
import { User, UserSchema } from 'src/usuarios/schema-users/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Sesion, SessionSchema } from './dto/sessions';
export declare class AuthService {
    private userModel;
    private sessionModel;
    private jwtService;
    constructor(userModel: Model<UserSchema>, sessionModel: Model<SessionSchema>, jwtService: JwtService);
    login(createAuthDto: LoginAuthDto): Promise<{
        user: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> & import("mongoose").Document<unknown, {}, User> & User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        accessToken: string;
        sessionId: string;
    }>;
    logout(userId: string): Promise<void>;
    getSessions(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Sesion> & Sesion & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, Sesion> & Sesion & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findAll(): string;
    findOne(id: number): string;
    remove(id: number): string;
}
