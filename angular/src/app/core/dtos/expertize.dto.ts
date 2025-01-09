import { Type } from 'class-transformer';
import { IsDefined, IsString, ValidateNested } from 'class-validator';

export class labelDto {
  @IsDefined()
  @IsString()
  female: string;

  @IsDefined()
  @IsString()
  male: string;

  @IsDefined()
  @IsString()
  unknown: string;
}

export class ExpertizeDto {
  @IsDefined()
  @ValidateNested()
  @Type(() => labelDto)
  label: labelDto;
}
