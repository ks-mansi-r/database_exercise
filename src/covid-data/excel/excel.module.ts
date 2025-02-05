import { Module } from '@nestjs/common';
import { ExcelController } from './excel.controller';
import { ExcelService } from './excel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from 'src/country/entity/country.entity';
import { TimeSeries } from 'src/timeseries/entity/timeseries.entity';

@Module({
  controllers: [ExcelController],
  providers: [ExcelService],
  imports: [TypeOrmModule.forFeature([Country, TimeSeries])],
})
export class ExcelModule {}