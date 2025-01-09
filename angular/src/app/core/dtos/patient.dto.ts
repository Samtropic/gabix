import { IsDate, IsDefined, IsString } from "class-validator";

export class PatientDto {
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

  @IsDefined()
  @IsString()
  phone: string;

  @IsDefined()
  @IsString()
  professional: string;
}; 
