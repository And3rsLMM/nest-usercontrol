import { users } from '@prisma/client';
import { UserService } from 'src/user/services/user.service';
import { AuthService } from './../auth/services/auth.service';
import { CanActivate, ExecutionContext, Inject, Injectable, forwardRef } from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        //@Inject(forwardRef(()=>AuthService))
        private readonly authService: AuthService,
        private readonly userService: UserService 
    ){}

    async canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest()
        const {authorization} = request.headers;
        try {
            const data = this.authService.checkToken((authorization ?? '').split(' ')[1]);
            request.tokenPayload = data;
            request.users = await this.userService.getById(data.Id);
            return true;
        } catch (err) {
            return false
        }
    }
}