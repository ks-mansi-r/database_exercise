import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeSeries } from 'src/timeseries/entity/timeseries.entity';
import { Repository } from 'typeorm';
import { parse, format } from 'date-fns';

export interface CountryCase {
  country: string;
  month: string;
  confirmed: number;
  deaths: number;
  recovered: number;
}

@Injectable()
export class MwisecasesService {
  constructor(
    @InjectRepository(TimeSeries)
    private readonly timeseriesRepo: Repository<TimeSeries>,
  ) {}

  async getCountryCase(
    fromDate?: string,
    toDate?: string,
    confirmedGte?: number,
    confirmedLte?: number,
  ): Promise<CountryCase[]> {
    const result: CountryCase[] = [];

    const timeseriesData = await this.timeseriesRepo.find();

    const monthlyDataByCountry: {
      [country: string]: {
        [month: string]: {
          confirmed: number;
          deaths: number;
          recovered: number;
        };
      };
    } = {};

    // Date parsing logic
    const from = fromDate ? parse(fromDate, 'yyyy-MM-dd', new Date()) : new Date(0); // default to the far past
    const to = toDate ? parse(toDate, 'yyyy-MM-dd', new Date()) : new Date(); // default to now

    // Group timeseries data by country and month
    timeseriesData.forEach((entry) => {
      const date = parse(entry.date, 'yyyy-MM-dd', new Date());
      const month = format(date, 'yyyy-MM');

      if (date < from || date > to) return; // Skip entries outside the date range

      if (!monthlyDataByCountry[entry.name]) {
        monthlyDataByCountry[entry.name] = {};
      }

      if (!monthlyDataByCountry[entry.name][month]) {
        monthlyDataByCountry[entry.name][month] = {
          confirmed: 0,
          deaths: 0,
          recovered: 0,
        };
      }

      monthlyDataByCountry[entry.name][month].confirmed += entry.confirmed;
      monthlyDataByCountry[entry.name][month].deaths += entry.deaths;
      monthlyDataByCountry[entry.name][month].recovered += entry.recovered;
    });

    // Build the result by filtering on confirmed counts (if provided)
    Object.entries(monthlyDataByCountry).forEach(([country, months]) => {
      Object.entries(months).forEach(([month, { confirmed, deaths, recovered }]) => {
        const isWithinRange =
          (confirmedGte === undefined || confirmed >= confirmedGte) &&
          (confirmedLte === undefined || confirmed <= confirmedLte);

        if (isWithinRange) {
          result.push({
            country,
            month,
            confirmed,
            deaths,
            recovered,
          });
        }
      });
    });

    return result;
  }
}
