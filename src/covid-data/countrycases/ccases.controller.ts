import { Controller, Get, Query } from '@nestjs/common';
import { CcasesService } from './ccases.service';
import { GetCasesDto } from './dto/get-cases-detail.dto';


@Controller('ccases')

export class CcasesController {
  constructor(private readonly casesService: CcasesService) {}

  @Get()
  
  public getCases(@Query() getCases: GetCasesDto) {
    const { fromDate, toDate, countryCode } = getCases;
    return this.casesService.getCases(fromDate, toDate, countryCode);
  }
}