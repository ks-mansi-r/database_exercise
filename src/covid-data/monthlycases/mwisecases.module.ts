import { Module } from '@nestjs/common';
import { MwisecasesController } from './mwisecases.controller';
import { MwisecasesService } from './mwisecases.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeSeries } from 'src/timeseries/entity/timeseries.entity';

@Module({
  controllers: [MwisecasesController],
  providers: [MwisecasesService],
  imports: [TypeOrmModule.forFeature([TimeSeries])],
})
export class MwisecasesModule {}