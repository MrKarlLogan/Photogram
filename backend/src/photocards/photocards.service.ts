import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Photocard, PhotocardDocument } from './model/photocard.schema';
import { Model, Types } from 'mongoose';
import { PhotocardDTO } from './dto/photocard.dto';

@Injectable()
export class PhotocardsService {
  constructor(
    @InjectModel(Photocard.name)
    private photocardModel: Model<PhotocardDocument>,
  ) {}

  async findAll(): Promise<Photocard[]> {
    return this.photocardModel.find();
  }

  async create(
    createDTO: PhotocardDTO & { photoUrl: string },
  ): Promise<Photocard> {
    const newCard = new this.photocardModel(createDTO);
    return newCard.save();
  }

  async delete(id: string) {
    const onjectId = new Types.ObjectId(id);
    const deleteCard = await this.photocardModel.findOne({ _id: onjectId });
    console.log(deleteCard);
    if (!deleteCard)
      throw new NotFoundException(`Пользователь с ${id} не найден`);
    return this.photocardModel.deleteOne({ _id: onjectId });
  }
}
