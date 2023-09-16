import { PartialType } from '@nestjs/mapped-types';
import { CreateAppImageDto } from './create-app_image.dto';

export class UpdateAppImageDto extends PartialType(CreateAppImageDto) {}
