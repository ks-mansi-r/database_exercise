import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Country } from './entity/country.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CountriesListDto } from './dto/add-country.dto';
import { PatchCountryDto } from './dto/patch-country.dto';
import { Validate } from 'class-validator';
@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  // Add new country
  public async addCountry(countryData: CountriesListDto) {
    const existingCountry = await this.countryRepository.findOne({
      where: { code: countryData.code },
    });

    if (existingCountry) {
      throw new BadRequestException('Country with this code already exists.');
    }

    const newCountry = this.countryRepository.create(countryData);
    return await this.countryRepository.save(newCountry);
  }

  // Update existing country
  public async updateCountry(updateCountryDataDto: PatchCountryDto) {
    const existantCountry = await this.countryRepository.findOne({
      where: { id: updateCountryDataDto.id },
    });

    if (!existantCountry) {
      throw new BadRequestException('Country not found.');
    }

    existantCountry.cName = updateCountryDataDto.cName ?? existantCountry.cName;
    existantCountry.code = updateCountryDataDto.code ?? existantCountry.code;
    existantCountry.flag = updateCountryDataDto.flag ?? existantCountry.flag;

    return await this.countryRepository.save(existantCountry);
  }

  // Delete country if no timeseries data exists
  public async deleteCountry(id: number): Promise<Country> {
    const country = await this.countryRepository.findOne({
      where: { id: id },
      relations: ['timeseries'],
    });

    if (!country) {
      throw new BadRequestException('Country not found.');
    }

    if (country.timeseries.length > 0) {
      throw new BadRequestException(
        'This country cannot be deleted because it has timeseries data.',
      );
    }

    return await this.countryRepository.remove(country);
  }

  // Get a country by ID
  public async getCountry(id: number) {
    return await this.countryRepository.findOne({
      where: { id: id },
      relations: ['timeseries'],
    });
  }
}
