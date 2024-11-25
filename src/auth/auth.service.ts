import { Injectable, UnauthorizedException } from '@nestjs/common';

import { SignupDTO } from './dto/signup.dto';
import { LoginDTO } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';

import { User } from '../users/schema/users.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async signup(signupDTO: SignupDTO) {
    const { firstName, lastName, email, password } = signupDTO;
    const user = this.userService.create({
      firstName,
      lastName,
      email,
      password: await bcrypt.hash(password, 12),
    });
    const payload = { sub: email };
    return { ...user, accessToken: this.jwtService.sign(payload) };
  }

  async login(loginDTO: LoginDTO): Promise<{ accessToken: string }> {
    const user = await this.findOneByEmail(loginDTO.email);

    if (!user || !(await bcrypt.compare(loginDTO.password, user.password))) {
      throw new UnauthorizedException('Incorrect email or password!');
    }

    const payload = { sub: user._id.toString() };
    return { accessToken: this.jwtService.sign(payload) };
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userService.findOne(email);
  }
}
