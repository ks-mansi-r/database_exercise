import { Module } from '@nestjs/common';
import { TimeseriesController } from './timeseries.controller';
import { TimeseriesService } from './timeseries.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from 'src/country/entity/country.entity';
import { TimeSeries } from './entity/timeseries.entity';
import { PaginationModule } from 'src/common/pagination.module';

@Module({
  controllers: [TimeseriesController],
  providers: [TimeseriesService],
  imports: [TypeOrmModule.forFeature([Country, TimeSeries]), PaginationModule],
})
export class TimeseriesModule {}