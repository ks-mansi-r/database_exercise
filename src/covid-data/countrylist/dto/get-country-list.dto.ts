
import { IsOptional, IsString } from 'class-validator';

export class GetCountriesList {
  
  @IsString()
  @IsOptional()
  name?: string;

  
  @IsString()
  @IsOptional()
  code?: string;
}