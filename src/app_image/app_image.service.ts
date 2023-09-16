import { Injectable } from '@nestjs/common';
import { CreateAppImageDto } from './dto/create-app_image.dto';
import { UpdateAppImageDto } from './dto/update-app_image.dto';

@Injectable()
export class AppImageService {
  create(createAppImageDto: CreateAppImageDto) {
    return 'This action adds a new appImage';
  }

  findAll() {
    return `This action returns all appImage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appImage`;
  }

  update(id: number, updateAppImageDto: UpdateAppImageDto) {
    return `This action updates a #${id} appImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} appImage`;
  }
}
