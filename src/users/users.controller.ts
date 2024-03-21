import { Body, Controller, Post, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { createProfileDTO } from './dto/create-profile.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    getUsers(): Promise<User[]> {
        return this.usersService.getUsers();
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.getUserById(id);
    }

    @Post()
    createUser(@Body() newUser: CreateUserDto) {
        return this.usersService.createUser(newUser)
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id);
    }

    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto) {
        this.usersService.updateUser(id, user);
    }

    @Post(':id/profile')
    createPRofile(@Param('id', ParseIntPipe) id: number, @Body() profile: createProfileDTO) {
        return this.usersService.createProfile(id, profile)
    }
}
