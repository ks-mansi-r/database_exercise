import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Put,
    Post,
    Query,
  } from '@nestjs/common';
 import { CountryService } from './country.service';
//  import { CountriesListDto } from './dto/add-country.dto';
//   import { PatchCountryDto } from './dto/patch-country.dto';
  import { createCountry, updateCountry } from './dto/add-country.dto';
  
  
  @Controller('country')

export class CountryController {
  constructor(
    /**
     * inject country service
     */
    private readonly countryService: CountryService,
  ) {}

  @Post()
  
  public addCountry(@Body() countryDto: createCountry) {
    return this.countryService.addCountry(countryDto);
  }

  @Put()
  
  public updateCountry(@Body() updateCountryDto: updateCountry) {
    return this.countryService.updateCountry(updateCountryDto);
  }

  @Delete(':id')
  
  
  public deleteCountry(@Query('id', ParseIntPipe) id: number) {
    return this.countryService.deleteCountry(id);
  }

  @Get(':id')
  
  public getCountry(@Param('id', ParseIntPipe) id: number) {
    return this.countryService.getCountry(id);
  }
}