import { Controller, Get, Query } from '@nestjs/common';
// import { GetCountriesList } from './dtos/get-country-list.dto';
import { GetCountriesList } from './countrylist/dto/get-country-list.dto';
import { CountrylistService } from './countrylist/countrylist.service';

@Controller('countrylist')

export class CountrylistController {
  constructor(private readonly countriesService: CountrylistService) {}

  @Get()
  
  public getCountries(@Query() getCountriesList: GetCountriesList) {
    const { name, code } = getCountriesList;
    return this.countriesService.getCountries(name, code);
  }
}