import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountryModule } from './country/country.module';
import { TimeseriesModule } from './timeseries/timeseries.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './country/entity/country.entity';
import { TimeSeries } from './timeseries/entity/timeseries.entity';
import { CountrylistModule } from './get-all-data/countrylist/countrylist.module';
import { CwisecasesModule } from './get-all-data/cwisecases/cwisecases.module';
import { CcasesModule } from './get-all-data/countrycases/ccases.module';
import { MwisecasesModule } from './get-all-data/monthlycases/mwisecases.module';
import { TopcasesModule } from './get-all-data/top countries/topcases.module';
import { ExcelModule } from './get-all-data/excel/excel.module';

@Module({
  imports: [CountryModule,
   TimeseriesModule,
   CountrylistModule,
   CwisecasesModule,
   CcasesModule,
   MwisecasesModule,
   TopcasesModule,
   ExcelModule,
    TypeOrmModule.forRootAsync({
      useFactory:() =>({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'user',
    password: 'password',
    database: 'covid_dbase',
    entities: [Country,TimeSeries],
    synchronize: true, // Prevent accidental schema overwrite
    autoLoadEntities: true,
    // logging: true,  // Enables SQL logging in the console
  }),
}),
  
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
