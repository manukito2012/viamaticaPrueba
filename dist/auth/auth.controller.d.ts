import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(createAuthDto: LoginAuthDto): Promise<{
        user: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../usuarios/schema-users/user.schema").User> & import("../usuarios/schema-users/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> & import("mongoose").Document<unknown, {}, import("../usuarios/schema-users/user.schema").User> & import("../usuarios/schema-users/user.schema").User & {
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
    getSessions(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./dto/sessions").Sesion> & import("./dto/sessions").Sesion & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }> & import("mongoose").Document<unknown, {}, import("./dto/sessions").Sesion> & import("./dto/sessions").Sesion & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    remove(id: string): string;
}
