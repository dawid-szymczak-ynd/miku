import { BookKeeperCommonModule } from '@miku-credit/book-keeper/common';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
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
    TerminusModule,
    BookKeeperCommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
