import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async insertUser(userName: string, email: string, password: string) {
    try {
      const user = new this.userModel({
        userName,
        email,
        password
      });
      const result = await user.save()
      return result
    }
    catch(e){
      throw new Error(e)
    }
  }

  async getAllUsers() {
    const users = this.userModel.find();
    return users;
  }

  async getUser(userId:string) {
    try{
      const user = await this.userModel.findById(userId)
      if(!user)
        throw new NotFoundException('Could not find user');
      return user;
    }
    catch(error) {
      throw new NotFoundException('user not found');
    }
  }
}
