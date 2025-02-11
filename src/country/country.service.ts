import { BadRequestException, ConflictException, Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Country } from './entity/country.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCountry, updateCountry } from './dto/add-country.dto';
import { Validate } from 'class-validator';
import { PaginationProvider } from 'src/common/provider/pagination.provider';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class CountryService {
  constructor(
    
    // inject countryRepository
     

    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,

    // inject datasource
    private readonly dataSource : DataSource,

    //inject paginationprovider
    private readonly paginationProvider:PaginationProvider,
  ) { }

  
  // for add country data
  public async addCountry(countryData: CreateCountry) {

    //Create a query runner
    const queryRunner = this. dataSource.createQueryRunner();


    //connect query runner 
    await queryRunner.connect();

    //start Transaction
    await queryRunner.startTransaction();
    try{

    }catch(error){
      throw new RequestTimeoutException(
        'Not connect to the database',
      );
    }


    // if the ISO code already exists, return a 409 Conflict error.
    try{
    await this.countryRepository.findOne({
      where: { code: countryData.code },
    });

    const newCountry = await this.countryRepository.create(countryData);
    return await this.countryRepository.save(newCountry);
  }
  catch(error){
    throw new ConflictException(
      'Data is already exist for this Iso Code',
      {
        description:String(error),
      },
    );
  }
  finally{
    try{
      //release the connection 
      await queryRunner.release();
      
    }
    catch(error){
      throw new RequestTimeoutException(
        
        'NOt Release the connection ',
        {
          description:String(Error),
        }
      );

    }
  }
  }
  


  //for update country data
  public async updateCountry(updateCountryDataDto: updateCountry) {

    try{
  // Step 1: Find the existing country
  const existantCountry = await this.countryRepository.findOneBy({
    id: updateCountryDataDto.id,
  });

  // Step 2: Handle case where country does not exist
  if (!existantCountry) {
    throw new NotFoundException(`Country with ID ${updateCountryDataDto.id} not found.`);
  }

  // Step 3: Check if the new code or flag already exists in another country
  if (updateCountryDataDto.code || updateCountryDataDto.flag) {
    const existingCountry = await this.countryRepository.findOne({
      where: [
        { code: updateCountryDataDto.code },
        { flag: updateCountryDataDto.flag },
      ],
    });

    if (existingCountry && existingCountry.id !== existantCountry.id) {
      throw new BadRequestException(`Another country already has this flag or code.`);
    }
  }

  // Step 4: Update the country fields only if they are provided
  if (updateCountryDataDto.Name) existantCountry.cName = updateCountryDataDto.Name;
  if (updateCountryDataDto.code) existantCountry.code = updateCountryDataDto.code;
  if (updateCountryDataDto.flag) existantCountry.flag = updateCountryDataDto.flag;

  // Step 5: Save updated country
  return await this.countryRepository.save(existantCountry);
}catch(error){
  throw new NotFoundException(
    'For this ID country is not found',
  );
}
}

// delete a country
public async deleteCountry(id: number): Promise<Country> {
  try{
  const country = await this.countryRepository.findOne({
    relations: { timeseries: true },
    where: { id: id },
  });

  if (!country) {
    throw new NotFoundException(`Country with ID ${id} not found.`);
  }

  if (country.timeseries && country.timeseries.length > 0) {
    throw new BadRequestException(`This country cannot be deleted because it has timeseries data.`);
  }

  return await this.countryRepository.remove(country);
}catch(error){
  throw new NotFoundException(
    'For this ID country is not found',
  );
}
}



  public async getCountry(id: number) {

    //if the countryId is not found, return a 404 error with an appropriate error message.
    
    try{
    const country = await this.countryRepository.findOne({
      where: { id: id },
    });

    if (!country) throw new NotFoundException('Coutnry is not found.');
    const data = await this.countryRepository.findOne({
      relations: { timeseries: true },
      where: { id: id },
    });
    return data;
  }
  
  catch(error){
    //throw a 404 error if country is not found
          throw new NotFoundException('Country is not found for this id ');
  }
  }

  public async getAllCountry(countryQuery: PaginationQueryDto) {
    try {
      const country = await this.paginationProvider.paginateQuery(
        {
          limit: countryQuery.limit,
          page: countryQuery.page,
        },
        this.countryRepository,
      );
      return country;
    } catch (error) {
      throw new NotFoundException('Data is not available');
    }
  }
}