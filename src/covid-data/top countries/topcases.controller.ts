import { Controller, Get, Query } from '@nestjs/common';
import { GetTopCountries } from './dto/get-top-countries.dto';

import { TopcasesService } from './topcases.service';

@Controller('topcases')

export class TopcasesController {
  constructor(private readonly topCases: TopcasesService) {}

  @Get()

  public getCases(@Query() getMonthCases: GetTopCountries) {
    const { fromDate, toDate, top } = getMonthCases;
    return this.topCases.getCountryCase(fromDate, toDate, top);
  }
}