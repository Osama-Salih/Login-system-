import { Injectable } from '@nestjs/common';
import { User } from './schema/users.schema';
import { JwtService } from '@nestjs/jwt';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async create(userData: User): Promise<{ accessToken: string }> {
    const user = await this.userModel.create(userData);

    const payload = { sub: user._id.toString() };
    const accessToken = this.jwtService.sign(payload);
    return { ...user.toObject(), accessToken };
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find();
  }

  findOne(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }
}
