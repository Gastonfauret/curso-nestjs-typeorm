import { Controller, Get, Post, Body } from "@nestjs/common";
import { createProfileDTO } from "src/users/dto/create-profile.dto";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostsService } from "./posts.service";

@Controller('posts')
export class PostsController {
  constructor(private postsServices: PostsService ) {}
  
  @Post()
  createPost(@Body() post: CreatePostDto) {
    return this.postsServices.createPost(post)
  }

  @Get()
  getPosts() { 
    return this.postsServices.getPosts()   
  }
}
