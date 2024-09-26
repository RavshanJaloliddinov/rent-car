import { Module } from '@nestjs/common';
import { CarModule } from './modules';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { CheckRolesGuard } from './guards';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    CarModule,
  ],
  providers: [
    {
      useClass: CheckRolesGuard,
      provide: APP_GUARD
    }
  ],
})
export class AppModule {}
