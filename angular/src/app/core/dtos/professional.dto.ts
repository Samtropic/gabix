import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsDefined, IsString, ValidateNested } from 'class-validator';

// @dynamic
export class ProfessionalDto {
  @IsDefined()
  @IsString()
  firstName: string;

  @IsDefined()
  @IsString()
  lastName: string;

  @IsDefined()
  @IsString()
  email: string;

  @IsDefined()
  @IsDate()
  birthdate: Date;

  services:ProfessionalServicesDto;

  @IsDefined()
  @IsString()
  password: string;

  @IsDefined()
  @IsString()
  mainExpertize: string;

  @IsDefined()
  @IsString()  
  phone: string;

  @IsDefined()
  @IsBoolean()  
  about: string;


  @IsDefined()
  @ValidateNested()  
  @Type(() => ProfessionaladdressDto)
  address: ProfessionaladdressDto;

  @IsDefined()
  @ValidateNested()  
  @Type(() => ProfessionalConfirmatuionDto)
  isConfirmed: ProfessionalConfirmatuionDto;
}

// @dynamic
export class ProfessionalServicesDto {
  prl: ProfessionalServicesPrlDto;
}

export class ProfessionalServicesPrlDto {
  @IsDefined()
  @IsBoolean()
  enabled: boolean;
}

// @dynamic
export class ProfessionaladdressDto {
  @IsDefined()
  @IsString()
  city: string;

  @IsDefined()
  @IsString()  
  country: string;
}

// @dynamic
export class ProfessionalConfirmatuionDto {
  @IsDefined()
  @IsBoolean()
  email: boolean;
}