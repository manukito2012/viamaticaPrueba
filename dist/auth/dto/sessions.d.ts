import { HydratedDocument, Document } from 'mongoose';
export type SessionSchema = HydratedDocument<Sesion>;
export declare class Sesion extends Document {
    userId: string;
    event: string;
    times: Date;
}
export declare const SessionSchema: import("mongoose").Schema<Sesion, import("mongoose").Model<Sesion, any, any, any, Document<unknown, any, Sesion> & Sesion & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Sesion, Document<unknown, {}, import("mongoose").FlatRecord<Sesion>> & import("mongoose").FlatRecord<Sesion> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
