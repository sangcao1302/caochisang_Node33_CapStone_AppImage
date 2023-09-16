import { Injectable , HttpException,HttpStatus, BadRequestException, ForbiddenException} from '@nestjs/common';
import { PrismaClient, nguoi_dung } from '@prisma/client';
import { LoginType, SignUpType } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { UserLoginDto, UserSignUpDto } from './dto/auth.dto';
import { ApiResponse } from '@nestjs/swagger';
import { promises } from 'dns';
import { FileInterceptor } from '@nestjs/platform-express';
import { json } from 'stream/consumers';

@Injectable()
export class AuthService {
 model =new PrismaClient()
 async login(body:LoginType){
  let {email,mat_khau}=body
  let checkEmail=await this.model.nguoi_dung.findFirst({
    where:{
      email
    }
  })
 
  if(checkEmail){
    let checkPass=  bcrypt.compare(mat_khau,checkEmail.mat_khau)
    if(checkPass){
      return {
        "statusCode":200,
        "content":{
          "id":checkEmail.nguoi_dung_id,
          "hoten":checkEmail.ho_ten,
          "email":checkEmail.email,
          "matkhau":checkEmail.mat_khau,
          "tuoi":checkEmail.tuoi,
          "avatar":checkEmail.anh_dai_dien
        }
      }
    }
    else{
      return "Sai mật khẩu hoặc tên đăng nhập"
    }
  }
  else{
    return "Email không tồn tại"
  }
 }

 async signup(body:SignUpType,img:any){
 
    let {email,mat_khau,ho_ten,tuoi,anh_dai_dien}=body

    let checkEmail= await this.model.nguoi_dung.findFirst({
      where:{
        email
      }
    })
    console.log(checkEmail)
    if(checkEmail){
     
     throw new BadRequestException({status:400,message: "Yêu cầu không hợp lệ!",content:'Email đã tồn tại',dateTime:new Date()})

    }
    else{
        const createUser=await this.model.nguoi_dung.create({
        data: {
          email,
          mat_khau,
          tuoi:Number(tuoi),
          anh_dai_dien:""+img,
          ho_ten
        },
       
      })
      return [{
        "statusCode":200,
        "content":{
          "id":(await createUser).nguoi_dung_id,
          "hoten":(await createUser).ho_ten,
          "email":(await createUser).email,
          "matkhau":(await createUser).mat_khau,
          "tuoi":(await createUser).tuoi,
          "avatar":(await createUser).anh_dai_dien
        }
      }]
    }
   

     }
    
 

 

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

 

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
