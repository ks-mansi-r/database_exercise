import { Controller, Get, Query } from '@nestjs/common';
import { getCountryCases } from './dto/get-country-cases.dto';

import { CwisecasesService } from './cwisecases.service';

@Controller('cwisecases')

export class CwisecasesController {
  constructor(private readonly countryCase: CwisecasesService) {}

  @Get()
  
  public getCases(@Query() getCountryCases: getCountryCases) {
    const { fromDate, toDate, confirmedGte, confirmedLte } = getCountryCases;
    return this.countryCase.getCountryCase(
      fromDate,
      toDate,
      confirmedGte,
      confirmedLte,
    );
  }
}