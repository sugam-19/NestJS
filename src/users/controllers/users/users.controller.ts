import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseBoolPipe, ParseIntPipe, Post, Query, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response, response } from 'express';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
//for implementing guard on every routes
// @UseGuards(AuthGuard)
export class UsersController {
    constructor(private userService: UsersService ) {

    }
    
    // @Get()
    // getUsers(@Query('sortDesc', ParseBoolPipe) sortBy: boolean) {
    //     console.log(sortBy)
    //     return [{ username: "Sugam", email: "sgmpdl@gmail.com" }]
    // }
    @Get()
    @UseGuards(AuthGuard)
    getUsers() {
        return this.userService.fetchUsers();
    }

    // @Get('posts')
    // getUsersPost() {
    //    return [
    //         {
    //         username: "Sugam", 
    //         email: "sgmpdl@gmail.com", 
    //         posts: [
    //             {
    //                 id: 1,
    //                 title: "Post 1"
    //             },
    //             {
    //                 id: 2,
    //                 title: "Post 2"
    //             },
    //             {
    //                 id: 3,
    //                 title: "Post 3"
    //             },
    //             {
    //                 id: 4,
    //                 title: "Post 4"
    //             }
    //         ]
    //     }
    // ]
    // }

    // @Get('posts/comments')
    // getUsersPostsComments() {
    //     return [
    //         {
    //             id: 1,
    //             title: "Post 1",
    //             comments: []
    //         },
    //     ]
    // }

    @Post('create')
    @UsePipes(new ValidationPipe())
    createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto ) {
        console.log(userData)
        return this.userService.createUser(userData);
    }

    @Get(':id/')
    getUserById(@Param('id', ParseIntPipe) id: number) {
       const user = this.userService.fetchUserById(id);
       if(!user) {
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
       }
       return user;
    }
}
