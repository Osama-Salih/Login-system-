import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { ObjectId } from 'mongoose';

export class User {
  @Transform(({ value }) => value.toString())
  _id?: ObjectId;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: 'user', isOptional: true })
  role?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
