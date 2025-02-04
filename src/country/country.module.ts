import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entity/country.entity';
import { TimeSeries } from 'src/timeseries/entity/timeseries.entity';

@Module({
  controllers: [CountryController],
  providers: [CountryService],
  imports: [TypeOrmModule.forFeature([Country, TimeSeries])],
})
export class CountryModule {}