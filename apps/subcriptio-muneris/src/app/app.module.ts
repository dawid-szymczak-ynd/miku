import { SubcriptioMunerisCommonModule } from '@miku-credit/subcriptio-muneris/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRESQL_HOST,
      port: Number(process.env.POSTGRESQL_PORT),
      username: process.env.POSTGRESQL_USERNAME,
      password: process.env.POSTGRESQL_PASSWORD,
      database: process.env.POSTGRESQL_DATABASE,
      autoLoadEntities: true,
    }),
    SubcriptioMunerisCommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
