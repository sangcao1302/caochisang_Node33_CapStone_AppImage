import { Module } from '@nestjs/common';
import { AppImageService } from './app_image.service';
import { AppImageController } from './app_image.controller';

@Module({
  controllers: [AppImageController],
  providers: [AppImageService],
})
export class AppImageModule {}
