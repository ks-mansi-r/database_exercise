import { TimeSeries } from 'src/timeseries/entity/timeseries.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false, 
    // default: 'Unknown'  // Ensure no null values for country name
    unique: true,     // Ensure the country name is unique
  })
  cName: string;

  @Column({
    type: 'varchar',
    // nullable: true,   // Allow flag to be null if it's not required
    unique: true,     // Ensure the flag is unique, if applicable
  })
  flag: string;

  @Column({
    type: 'varchar',
    // nullable: false,  // Ensure the code is not null
    unique: true,     // Ensure the ISO code is unique
  })
  code: string;

  @OneToMany(() => TimeSeries, (time) => time.country)
  timeseries: TimeSeries[];
}
