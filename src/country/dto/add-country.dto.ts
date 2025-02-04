// add-country.dto.ts (CreateCountryDto)
import { IsString, IsNotEmpty, IsISO31661Alpha2 } from 'class-validator';

export class CountriesListDto {
  @IsString()
  @IsNotEmpty()
  cName: string; // Country Name

  @IsString()
  @IsNotEmpty()
  // @IsISO31661Alpha2() // Ensures it's a valid ISO country code
  code: string; // Country ISO code

  @IsString()
  @IsNotEmpty()
  flag: string; // Country flag
}
