import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Photocard, PhotocardDocument } from './model/photocard.schema';
import { Model, Types } from 'mongoose';
import { PhotocardDTO } from './dto/photocard.dto';
import { unlink } from 'fs/promises';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PhotocardsService {
  constructor(
    @InjectModel(Photocard.name)
    private photocardModel: Model<PhotocardDocument>,
    private configService: ConfigService,
  ) {}

  async findAll(): Promise<Photocard[]> {
    return this.photocardModel.find();
  }

  async create(
    createDTO: PhotocardDTO & { photoUrl: string; createdDate: Date },
  ): Promise<Photocard> {
    const newCard = new this.photocardModel(createDTO);
    return newCard.save();
  }

  async delete(id: string) {
    const objectId = new Types.ObjectId(id);
    const deleteCard = await this.photocardModel.findOne({ _id: objectId });
    const filePath = `./public${deleteCard?.photoUrl}`;

    if (!deleteCard)
      throw new NotFoundException(`Пользователь с ${id} не найден`);

    try {
      await unlink(filePath);
    } catch (error) {
      console.error(`Не удалось удалить файл ${filePath}, ${error}`);
    }

    const result = await this.photocardModel.deleteOne({ _id: objectId });

    if (result.deletedCount === 0)
      throw new NotFoundException(`Не удалось удалить запись с ID ${id}`);

    return {
      success: true,
      message: 'Карточка успешно удалена',
      deletedId: id,
      deletedCount: result.deletedCount,
    };
  }
}
