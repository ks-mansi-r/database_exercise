import { Module } from '@nestjs/common';
import { CwisecasesController } from './cwisecases.controller';
import { CwisecasesService } from './cwisecases.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeSeries } from 'src/timeseries/entity/timeseries.entity';

@Module({
  controllers: [CwisecasesController],
  providers: [CwisecasesService],
  imports: [TypeOrmModule.forFeature([TimeSeries])],
})
export class CwisecasesModule {}