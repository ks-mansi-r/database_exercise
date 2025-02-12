import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from 'src/country/entity/country.entity';
import { Repository } from 'typeorm';
import { GetCountriesList } from './dto/get-country-list.dto';
@Injectable()
export class CountrylistService {
  constructor(
    /**
     * inject country repository
     */
    @InjectRepository(Country)
    private readonly countryRepo: Repository<Country>,
  ) {}
//   public async getCountries(name?: string, code?: string) {
//     let result = await this.countryRepo.find();

//     if (name) {
//       name = name.toLowerCase();
//       result = result.filter((country) =>
//         country.cName?.toLowerCase().includes(name),
//       );
//     }

//     if (code) {
//       code = code.toLowerCase();

//       result = result.filter((country) =>
//         country.code?.toLowerCase().includes(code),
//       );
//     }

//     return result;
//   }
public async getCountries(name?: string, code?: string): Promise<Country[]> {
    const query = this.countryRepo.createQueryBuilder('country');
  
    if (name) {
      query.andWhere('LOWER(country.cName) LIKE LOWER(:name)', { name: `%${name}%` });
    }
  
    if (code) {
      query.andWhere('LOWER(country.code) LIKE LOWER(:code)', { code: `%${code}%` });
    }
  
    return await query.getMany();
  }
  
}