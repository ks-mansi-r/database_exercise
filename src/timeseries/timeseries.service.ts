import { BadRequestException, ConflictException, Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { TimeSeries } from './entity/timeseries.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { createTimeseries, updateTimeseries, deleteTimeseries } from './dto/timeseries.dto';
import { PaginationProvider } from 'src/common/provider/pagination.provider';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
@Injectable()
export class TimeseriesService {
  constructor(
    
     //inject timeseries repository
    

    @InjectRepository(TimeSeries)
    private readonly timeseriesRepository: Repository<TimeSeries>,

    //Inject datasource 
    private readonly datasource: DataSource,

    //inject paginationprovider
    private readonly paginationProvider: PaginationProvider,
  ) {}


  // For add timeseries data

  public async createTimeseries(data: createTimeseries) {
    console.log('Received DTO:', data); // Check if dto is undefined
    console.log('DTO Keys:', Object.keys(data)); // Check available fields
    console.log('DTO Name:', data.name); // Check if dto.name is undefined
    console.log('DTO Name Length:', data.name?.length);
    
// create a query runne5r
    const queryRunner = this.datasource.createQueryRunner();

    //connect a query runner
    await queryRunner.connect();

    // Start transcation
    await queryRunner.startTransaction();
    try{
      
    }
    catch(error){
      throw new RequestTimeoutException(
        'Not connect to database please check it ',
      );

    }


    try{
    for (let i = 0; i < data.data.length; i++) {
      const existingData = await this.timeseriesRepository.findOne({
        where: { date: data.data[i].date, name: data.name },
      });
      if (existingData)
        throw new BadRequestException(
          'Data is already exist for given Date and Country',
        );

      this.validDate(data.data[i].date);
      const timeData = {
        name: data.name,
        date: data.data[i].date,
        deaths: data.data[i].deaths,
        confirmed: data.data[i].confirmed,
        recovered: data.data[i].recovered,
      };

      const newData = await this.timeseriesRepository.create(timeData);
      await this.timeseriesRepository.save(newData);
    }

    return 'Congrates Data is added.';
  }
    catch(error){
  //If unsuccessfull then rollback transcation
  await queryRunner.rollbackTransaction();
  
  throw new ConflictException(
    'Not complete the transaction',)
} 
finally{
  
  try {
    // Release transcation
    await queryRunner.release();
  } catch (error) {
    throw new RequestTimeoutException('Not release the connection', 
      {
      description: String(error),
    });
  }
}
}

  public async updateTimeseries(data: updateTimeseries) {

    try{
    const existingData = await this.timeseriesRepository.findOne({
      where: { name: data.name, date: data.date },
    });
    if (!existingData)
      throw new BadRequestException(
        'Data is not available for this date and country.',
      );
    Object.assign(existingData, data);
    return await this.timeseriesRepository.save(existingData);
    }
    catch(error){
      throw new NotFoundException(
        'Data is not available for this date and country.',
      )
    }
  }

  public async deleteTimeseries(data: deleteTimeseries) {

    try{
    this.validDate(data.from);
    this.validDate(data.to);

    const fromDate = new Date(data.from).getTime();
    const toDate = new Date(data.to).getTime();

    const countryData = await this.timeseriesRepository.find({
      where: { name: data.name },
    });

    const filterData = await countryData.filter((data) => {
      const date = new Date(data.date).getTime() ?? null;
      if (fromDate <= date && date <= toDate) return data;
    });
    const ids = filterData.map((data) => data.id);
    await this.timeseriesRepository.delete(ids);
    return 'Data is deleted.';
  }catch(error){
    throw new NotFoundException(
      'Data is not available for this date and country'
    )
  }
  }

  private validDate(date: string) {
    const time = new Date(date).getTime();
    const date_ = new Date(date).getDate();
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth() + 1;
    if (isNaN(time) || !date_ || !month || !year)
      throw new BadRequestException('this Date is not valid');
  }
  public async getTimeseries(timeseriesQuery: PaginationQueryDto) {
    try {
      const timeseries = await this.paginationProvider.paginateQuery(
        {

          limit: timeseriesQuery.limit,
          page: timeseriesQuery.page,
        },
        this.timeseriesRepository,
      );
      return timeseries;
    } catch (error) {
      throw new NotFoundException('Data is not available');
    }
  }
}