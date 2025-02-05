import { Module } from '@nestjs/common';
import { TopcasesController } from './topcases.controller';
import { TopcasesService } from './topcases.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeSeries } from 'src/timeseries/entity/timeseries.entity';

@Module({
  controllers: [TopcasesController],
  providers: [TopcasesService],
  imports: [TypeOrmModule.forFeature([TimeSeries])],
})
export class TopcasesModule {}