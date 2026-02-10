import { IsString } from 'class-validator';

export class PhotocardDTO {
  @IsString()
  author: string;
  @IsString()
  description: string;
  @IsString()
  location: string;
}
