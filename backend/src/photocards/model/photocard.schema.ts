import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PhotocardDocument = Photocard & Document;

@Schema({ timestamps: true })
export class Photocard {
  @Prop({ required: true })
  author: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  createdDate: Date;

  @Prop()
  location: string;

  @Prop({ required: true })
  photoUrl: string;
}

export const PhotocardSchema = SchemaFactory.createForClass(Photocard);
