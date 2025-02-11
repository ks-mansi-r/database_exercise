import {Body,Controller,Delete,Get,Param,ParseIntPipe,Patch,Put,Post,Query,
  } from '@nestjs/common';
 import { CountryService } from './country.service';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
  import { CreateCountry, updateCountry } from './dto/add-country.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
  
@Controller('country')
@ApiTags('Countries')
export class CountryController {
  constructor(
    /**
     * inject country service
     */
    private readonly countryService: CountryService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Add country',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfuly add country data',
  })
  public addCountry(@Body() countryDto: CreateCountry) {
    return this.countryService.addCountry(countryDto);
  }

  @Put()
  @ApiOperation({
    summary: 'Update country',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfuly update country data',
  })
  public updateCountry(@Body() updateCountryDto: updateCountry) {
    return this.countryService.updateCountry(updateCountryDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete country',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfuly delete country data',
  })
  
  public deleteCountry(@Query('id', ParseIntPipe) id: number) {
    return this.countryService.deleteCountry(id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'get country by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfuly get country data for specific id',
  })
  public getCountry(@Param('id', ParseIntPipe) id: number) {
    return this.countryService.getCountry(id);
  }

//get all country data
  @Get()
  @ApiOperation({
    summary: 'get all country',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfuly get country data',
  })
  public grtAllCountry(@Query() countryQuery: PaginationQueryDto) {
    return this.countryService.getAllCountry(countryQuery);
  }
}