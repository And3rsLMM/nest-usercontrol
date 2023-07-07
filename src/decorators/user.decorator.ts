import { users } from '@prisma/client';
import { ExecutionContext, NotFoundException, createParamDecorator } from "@nestjs/common";

export const User = createParamDecorator((filter: string, context: ExecutionContext)=>{
    const request = context.switchToHttp().getRequest();

    if(request.users){

        if(filter){
            return request.users[filter];
        } else {
            return request.users
        }

    } else {
        throw new NotFoundException('Usuario não encontrado');
    }

    
})