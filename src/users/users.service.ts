import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async createUser(user: CreateUserDto) {
        const userFound = await this.userRepository.findOne({
            where: {
                username: user.username
            }
        })

        if (userFound) {
            return new HttpException('User already exist', HttpStatus.CONFLICT)
        } else {
            const newUser = this.userRepository.create(user)
            return this.userRepository.save(newUser)
        }
    }


    getUsers() {
        return this.userRepository.find()
    }

    async getUserById(id: number) {
        const userFound = await this.userRepository.findOne({
            where: { id }
        })

        if (!userFound) {
            return new HttpException("User not found", HttpStatus.NOT_FOUND)
        }
        return userFound;
    }

    async deleteUser(id: number) {
        const userFound = await this.userRepository.findOne({ where: { id } })

        if (!userFound) {
            return new HttpException("User not found", HttpStatus.NOT_FOUND)
        } else {
            return this.userRepository.delete({ id });
        }

        
    }

    async updateUser(id: number, user: UpdateUserDto) {
        const userFound = await this.userRepository.findOne({ where: { id } })

        if (!userFound) {
            return new HttpException('User not found', HttpStatus.NOT_FOUND)
        } else {
            const updatedUser = Object.assign(userFound, user);
            return this.userRepository.save(updatedUser)            
        }        
    }
}

//1:09:46
//https://www.youtube.com/watch?v=W4_oH3anYHU&t=51s