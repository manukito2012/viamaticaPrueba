import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UserSchema } from './schema-users/user.schema';
import { Model } from 'mongoose';
export declare class UsuariosService {
    private userModel;
    constructor(userModel: Model<UserSchema>);
    create(createUserDto: CreateUsuarioDto): Promise<{
        email: string;
        _id: import("mongoose").Types.ObjectId;
        $locals: Record<string, unknown>;
        $op: "save" | "validate" | "remove" | null;
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: import("mongoose").Collection;
        db: import("mongoose").Connection;
        errors?: import("mongoose").Error.ValidationError;
        id?: any;
        isNew: boolean;
        schema: import("mongoose").Schema;
        nombre: string;
        apellido: string;
        identificacion: number;
        password: string;
        sessionId: string;
        __v: number;
    }>;
    private generateEmail;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUsuarioDto: UpdateUsuarioDto): string;
    remove(id: number): string;
}
