// import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class createCountry {
  
  @IsString()
  @IsNotEmpty()
  cName: string;

 
  @IsString()
  @IsNotEmpty()
  flag: string;

  
  @IsString()
  @IsNotEmpty()
  code: string;
}

export class updateCountry {
 
  @IsNotEmpty()
  @IsInt()
  id: number;

  
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  cName?: string;

  
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  flag?: string;

  
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  code?: string;
}