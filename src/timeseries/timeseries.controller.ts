import {
    Body,
    Controller,
    Post,
    Delete,
    Put,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
 import { TimeseriesService } from './timeseries.service';
  import { createTimeseries, updateTimeseries,deleteTimeseries } from './dto/timeseries.dto';
  @Controller('timeseries')
  export class TimeseriesController {
    constructor(
      /**
       * inject timeseries service
       */
      private readonly timeseriesService: TimeseriesService,
    ) {}
  
    @Post()
    @UsePipes(new ValidationPipe())
    async createTimeseries(@Body() data: createTimeseries) {
      return await this.timeseriesService.createTimeseries(data);
    }
  
    @Put()
    @UsePipes(new ValidationPipe())
    async updateTimeseries(@Body() data: updateTimeseries) {
      return await this.timeseriesService.updateTimeseries(data);
    }
  
    @Delete()
    @UsePipes(new ValidationPipe())
    async deleteTime(@Body() data: deleteTimeseries) {
      return await this.timeseriesService.deleteTimeseries(data);
    }
  }