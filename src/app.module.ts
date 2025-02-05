import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountryModule } from './country/country.module';
import { TimeseriesModule } from './timeseries/timeseries.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './country/entity/country.entity';
import { TimeSeries } from './timeseries/entity/timeseries.entity';
import { CountrylistModule } from './covid-data/countrylist/countrylist.module';
import { CwisecasesModule } from './covid-data/cwisecases/cwisecases.module';
import { CcasesModule } from './covid-data/countrycases/ccases.module';

@Module({
  imports: [CountryModule,
   TimeseriesModule,
   CountrylistModule,
   CwisecasesModule,
   CcasesModule,
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
