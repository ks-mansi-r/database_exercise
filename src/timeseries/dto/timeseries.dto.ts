import { UsePipes, ValidationPipe } from '@nestjs/common';
import {
  IsNotEmpty,
  IsInt,
  IsNumber,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class createData {
  @Matches(/^\d{4}-\d{1,2}-\d{2}$/, {
    message: 'Date must be in YYYY-MM-DD format',
  })
  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  @IsNumber()
  confirmed: number;

  @IsNotEmpty()
  @IsNumber()
  deaths: number;

  @IsNotEmpty()
  @IsNumber()
  recovered: number;
  // @IsInt()
  // @IsNotEmpty()
  // countryId: number;
}

@UsePipes(new ValidationPipe())
export class createTimeseries {
  @IsString()
  @IsNotEmpty()
  name: string;

  // @IsInt()
  // @IsNotEmpty()
  // countryId: number; // Move countryId here

  @ValidateNested({ each: true })
  @Type(() => createData)
  data: createData[];
}

export class updateTimeseries {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  @IsNumber()
  confirmed?: number;

  @IsNotEmpty()
  @IsNumber()
  deaths?: number;

  @IsNotEmpty()
  @IsNumber()
  recovered?: number;
}

export class deleteTimeseries {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Matches(/^\d{4}-\d{1,2}-\d{2}$/, {
    message: 'Date must be in YYYY-MM-DD format',
  })
  @IsNotEmpty()
  from: string;

  @Matches(/^\d{4}-\d{1,2}-\d{2}$/, {
    message: 'Date must be in YYYY-MM-DD format',
  })
  @IsNotEmpty()
  to: string;
}