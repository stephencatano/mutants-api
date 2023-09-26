import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MutantsModule } from './modules/mutants/mutants.module';
import { StatsModule } from './modules/stats/stats.module';
import expressConfig from '@config/express.config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ORMConfig = require('../ormconfig');

@Module({
  imports: [
    TypeOrmModule.forRoot(ORMConfig),
    ConfigModule.forRoot({
      load: [expressConfig],
    }),
    MutantsModule,
    StatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
