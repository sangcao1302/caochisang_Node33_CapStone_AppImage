import { Controller, Get, Post, Body, Patch, Param, Delete,Response,HttpCode, UseInterceptors, UploadedFile,} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto, UserSignUpDto } from './dto/auth.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileUploadDto } from './dto/upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  login(@Body () body:UserLoginDto){
    return this.authService.login(body)
  }

  @HttpCode(201)
  @ApiConsumes('multipart/form-data')
  // @ApiBody({ type: FileUploadDto })
  @Post('/signup')
  @UseInterceptors(
    FileInterceptor("anh_dai_dien", // key của FE gửi lên
      {
        // định nghĩa nơi lưu và đặt tên mới
        storage: diskStorage({
          destination: process.cwd() + "/public/img",
          filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname)
        })

      }
    )
  )
  signUp(@Body() body:UserSignUpDto,@UploadedFile() anh_dai_dien: Express.Multer.File) {

    // req.file
    return this.authService.signup(body,anh_dai_dien.filename)
  }

 

 

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
