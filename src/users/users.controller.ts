import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from './schema/users.schema';
import { UsersService } from './users.service';
import { RoleEnum } from 'src/roles/role.enum';
import { Roles } from 'src/roles/role.decorator';
import { RolesGuard } from 'src/roles/role.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }
}
