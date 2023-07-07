import { UserService } from 'src/user/services/user.service';
import { AuthService } from './../auth/services/auth.service';
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/roles.decorator'

@Injectable()
export class RoleGuard implements CanActivate{
    constructor(
        private readonly reflector: Reflector
    ){}

    async canActivate(context: ExecutionContext){
        const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, 
        [context.getHandler(), context.getClass()]);

        if(!requiredRoles){
            return true;
        }

        const {users} = context.switchToHttp().getRequest();

        const filteredRole = requiredRoles.filter(role => role === users.role);

        if(filteredRole.length > 0){
            return true
        } else{
            return false
        }
    }
}