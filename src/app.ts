import { Module } from '@nestjs/common';
import { CarModule } from './modules';

@Module({
  imports: [CarModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
