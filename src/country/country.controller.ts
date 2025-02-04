import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
  } from '@nestjs/common';
 import { CountryService } from './country.service';
 import { CountriesListDto } from './dto/add-country.dto';
  import { PatchCountryDto } from './dto/patch-country.dto';
  
  @Controller('country')
  export class CountryController {
    constructor(
      /**
       * inject country service
       */
      private readonly countryService: CountryService,
    ) {}
  
    @Post()
    public addCountry(@Body() countryDto: CountriesListDto) {
      return this.countryService.addCountry(countryDto);
    }
  
    @Patch()
    public updateCountry(@Body() updateCountryDto: PatchCountryDto) {
      return this.countryService.updateCountry(updateCountryDto);
    }
  
    @Delete()
    public deleteCountry(@Query('id', ParseIntPipe) id: number) {
      return this.countryService.deleteCountry(id);
    }
  
    @Get(':id')
    public getCountry(@Param('id', ParseIntPipe) id: number) {
      return this.countryService.getCountry(id);
    }
  }