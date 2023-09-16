import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppImageService } from './app_image.service';
import { CreateAppImageDto } from './dto/create-app_image.dto';
import { UpdateAppImageDto } from './dto/update-app_image.dto';

@Controller('app-image')
export class AppImageController {
  constructor(private readonly appImageService: AppImageService) {}

  @Post()
  create(@Body() createAppImageDto: CreateAppImageDto) {
    return this.appImageService.create(createAppImageDto);
  }

  @Get()
  findAll() {
    return this.appImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appImageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppImageDto: UpdateAppImageDto) {
    return this.appImageService.update(+id, updateAppImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appImageService.remove(+id);
  }
}
