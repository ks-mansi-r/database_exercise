import { Controller, Get, Query } from '@nestjs/common';
import { MwisecasesService } from './mwisecases.service';
import { GetMonthCases } from './dto/get-data.dto';
// import { CountryCase } from './mwisecases.service';  // Import the interface
import { CountryCase } from './mwisecases.service';
@Controller('mwisecases')
export class MwisecasesController {
  constructor(private readonly covidCase: MwisecasesService) {}

  @Get()
  public async getCases(@Query() getMonthCases: GetMonthCases): Promise<CountryCase[]> {
    const { fromDate, toDate, confirmedGte, confirmedLte } = getMonthCases;
    return this.covidCase.getCountryCase(
      fromDate,
      toDate,
      confirmedGte,
      confirmedLte,
    );
  }
}
