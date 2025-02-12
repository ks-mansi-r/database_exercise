import { Module } from '@nestjs/common';
import { CcasesController } from './ccases.controller';
import { CcasesService } from './ccases.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from '../../country/entity/country.entity';
import { TimeSeries } from '../../timeseries/entity/timeseries.entity';
@Module({
  controllers: [CcasesController],
  providers: [CcasesService],
  imports: [TypeOrmModule.forFeature([Country, TimeSeries])],
})
export class CcasesModule {}