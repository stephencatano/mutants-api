import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MutantsModule } from './modules/mutants/mutants.module';
import expressConfig from '@config/express.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [expressConfig],
    }),
    MutantsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
