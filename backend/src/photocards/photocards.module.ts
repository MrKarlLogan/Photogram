import { Module } from '@nestjs/common';
import { PhotocardsService } from './photocards.service';
import { PhotocardsController } from './photocards.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Photocard, PhotocardSchema } from './model/photocard.schema';
import { ConfigModule } from '@nestjs/config';
import { MulterConfigService } from './multer-config.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useClass: MulterConfigService,
    }),
    MongooseModule.forFeature([
      { name: Photocard.name, schema: PhotocardSchema },
    ]),
  ],
  providers: [PhotocardsService, MulterConfigService],
  controllers: [PhotocardsController],
})
export class PhotocardsModule {}
