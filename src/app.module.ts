import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppImageModule } from './app_image/app_image.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AppImageModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
