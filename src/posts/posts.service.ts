import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    private usersService: UsersService) { }

  async createPost(post: CreatePostDto) {
    const userFound = await this.usersService.getUserById(post.authorId)

    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    else {
      const newPost = this.postsRepository.create(post)
      return this.postsRepository.save(newPost);
    }
  }

  getPosts() {
    return this.postsRepository.find({
      relations: ['author']
    })
  }
}

