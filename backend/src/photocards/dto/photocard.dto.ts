import { IsDateString, IsString } from 'class-validator';

export class PhotocardDTO {
  @IsString()
  author: string;
  @IsString()
  description: string;
  @IsDateString()
  createdDate: Date;
  @IsString()
  location: string;
}
