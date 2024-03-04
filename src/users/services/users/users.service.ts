import { Injectable } from '@nestjs/common';
import { CreateUserType } from 'src/utils/types';

@Injectable()
export class UsersService {
    private fakeUsers = [
        { username: "Sugam", email: "sgmpdl@gmail.com" },
        { username: "Sugam1", email: "sgmpdl1@gmail.com" },
        { username: "Sugam2", email: "sgmpdl2@gmail.com" },
    ] 
    fetchUsers() {
        return this.fakeUsers;
    }

    createUser(userDetails: CreateUserType) {
        this.fakeUsers.push(userDetails);
        return {}
    }

    fetchUserById(id: number){
        return { id: 1, username: "sugam", email: "sgmpdl@gmail.com"}
    }
}
