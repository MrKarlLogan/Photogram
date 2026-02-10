import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PhotocardsService } from './photocards.service';
import { PhotocardDTO } from './dto/photocard.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import sharp from 'sharp';
import { unlink } from 'fs/promises';
import { ConfigService } from '@nestjs/config';

@Controller()
export class PhotocardsController {
  constructor(
    private photocardService: PhotocardsService,
    private configService: ConfigService,
  ) {}

  @Get()
  findAll() {
    return this.photocardService.findAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body()
    body: PhotocardDTO,
  ) {
    const originalPath = file.path;
    const sharpFilename = file.filename.split('.')[0];
    const sharpPath = this.configService.get<string>('sharp.destination');
    const sharpFilePath = `${sharpPath}/${sharpFilename}.webp`;

    try {
      await sharp(originalPath)
        .resize(1280, 720, { fit: 'cover' })
        .webp({ quality: 80 })
        .toFile(sharpFilePath);

      await unlink(originalPath);

      const photoUrl = `/photo/${sharpFilename}.webp`;

      return this.photocardService.create({
        ...body,
        photoUrl,
        createdDate: new Date(),
      });
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Не удалось обработать изображение');
    }
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.photocardService.delete(id);
  }
}
