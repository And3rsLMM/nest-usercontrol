import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { users } from "@prisma/client";
import { PrismaService } from "src/prisma/services/prisma.service";
import { UserService } from "src/user/services/user.service";
import { AuthRegisterDTO } from "src/auth/validation/auth-register.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly userService: UserService
    ){}

    createToken(user:users){
        return {
                accessToken: this.jwtService.sign({
                sub: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            {
                expiresIn:'1 day',
                issuer:'login'
            })
        }
    }
    
    checkToken(token:string){
        try{
            const data = this.jwtService.verify(token, {
                audience:'users',
                issuer:'login'
            });
            return data;
        } catch (err){
            throw new BadRequestException(err);
        }
        
    }

    isValidToken(token: string){
        try {
            this.checkToken(token)
            return true;
        } catch (err) {
            return false;
        }
    }

    async login(email:string, password:string){
        const user = await this.prisma.users.findFirst({
            where:{
                email,
                password
            }
        })

        if (!user){
            throw new UnauthorizedException('Email ou senha invalidos.')
        }
        return this.createToken(user);
    }

    async forget(email:string){
        const user = await this.prisma.users.findFirst({
            where:{
                email
            }
        })

        if (!user){
            throw new UnauthorizedException('Email invalido.')
        }
        return true;
    }

    async reset(password:string, token:string){
        if(token){
            
        }

        const id = 0;

        const user = await this.prisma.users.update({
            where:{
                id
            },
            data:{
                password
            }
        });
        return this.createToken(user);
    }

    async register(data: AuthRegisterDTO){
        const user = await this.userService.create(data)

        return this.createToken(user);
    }

}