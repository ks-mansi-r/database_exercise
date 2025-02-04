import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountryModule } from './country/country.module';
import { TimeseriesModule } from './timeseries/timeseries.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './country/entity/country.entity';
import { TimeSeries } from './timeseries/entity/timeseries.entity';

@Module({
  imports: [CountryModule,
    TimeseriesModule,
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'user',
    password: 'password',
    database: 'covid_dbase',
    entities: [Country, TimeSeries],
    synchronize: true, // Prevent accidental schema overwrite
    autoLoadEntities: true,
  }),
  
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
