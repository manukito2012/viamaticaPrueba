import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserSchema = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: true })
    nombre: string;

    @Prop({ required: true })
    apellido: string;

    @Prop({ required: true , unique: true })
    identificacion: number;

    @Prop({ required: true })
    password: string;


    
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ default: null })
    sessionId: string;

    @Prop({ default: 0 })
    failedAttempts: number;

    @Prop({ default: 'activo' })
    status: string;

    @Prop({ required: true, enum: ['usuario', 'admin'], default: 'usuario' })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);