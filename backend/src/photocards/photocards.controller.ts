import {
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

@Controller()
export class PhotocardsController {
  constructor(private photocardService: PhotocardsService) {}

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
    const photoUrl = `/photo/${file.filename}`;
    return this.photocardService.create({
      ...body,
      photoUrl,
    });
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.photocardService.delete(id);
  }
}
