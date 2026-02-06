import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { randomUUID } from 'crypto';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: this.configService.get<string>('upload.destination'),
        filename: (_req, file, callback) => {
          const uniqueName = `${randomUUID()}${path.extname(file.originalname)}`;
          callback(null, uniqueName);
        },
      }),
      limits: {
        fileSize: this.configService.get<number>('upload.maxFileSize'),
      },
      fileFilter: (_req, file, callback) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(
          path.extname(file.originalname).toLowerCase(),
        );
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) return callback(null, true);
        else callback(new Error('Разрешены только файлы изображений'), false);
      },
    };
  }
}
