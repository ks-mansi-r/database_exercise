import {Body,Controller,Post,Get,Query,Delete,Put,UsePipes,ValidationPipe,
  } from '@nestjs/common';
 import { TimeseriesService } from './timeseries.service';
  import { createTimeseries, updateTimeseries,deleteTimeseries } from './dto/timeseries.dto';
  import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
  
  @Controller('timeseries')
  @ApiTags('Timeseries')
  export class TimeseriesController {
    constructor(
      /**
       * inject timeseries service
       */
      private readonly timeseriesService: TimeseriesService,
    ) {}
  
    @Post()
    @ApiOperation({
      summary: 'Add timeseries data',
    })
    @ApiResponse({
      status: 200,
      description: ' add timeseries data',
    })
    @UsePipes(new ValidationPipe())
    async createTimeseries(@Body() data: createTimeseries) {
      return await this.timeseriesService.createTimeseries(data);
    }
  
    @Put()
    @ApiOperation({
      summary: 'Update timeseries data',
    })
    @ApiResponse({
      status: 200,
      description: 'update timeseries data',
    })
    @UsePipes(new ValidationPipe())
    async updateTimeseries(@Body() data: updateTimeseries) {
      return await this.timeseriesService.updateTimeseries(data);
    }
  
    @Delete()
    @ApiOperation({
      summary: 'Delete timeseries data',
    })
    @ApiResponse({
      status: 200,
      description: ' delete timeseries data',
    })
    @UsePipes(new ValidationPipe())
    async deleteTime(@Body() data: deleteTimeseries) {
      return await this.timeseriesService.deleteTimeseries(data);
    }

    @Get()
  @ApiOperation({
    summary: 'get all timeseries data',
  })
  @ApiResponse({
    status: 200,
    description: ' get timeseries data',
  })
  async getTimeseries(@Query() timeseriesQuery: PaginationQueryDto) {
    return await this.timeseriesService.getTimeseries(timeseriesQuery);
  }
  }