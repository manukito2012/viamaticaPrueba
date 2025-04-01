
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument,Document } from 'mongoose';


export type SessionSchema = HydratedDocument<Sesion>;

@Schema()
export class Sesion extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  event: string; 

  @Prop({ required: true })
  times: Date;
}

export const SessionSchema = SchemaFactory.createForClass(Sesion);
