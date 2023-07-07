import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "../validation/create-user.dto";
import { PrismaService } from "src/prisma/services/prisma.service";
import { UpdateUserDTO } from "../validation/update-user.dto";
import { UpdatePatchUserDTO } from "../validation/update-patch-user.dto";

@Injectable()
export class UserService{

    constructor(private readonly prisma: PrismaService) {}

    async create({name, email, password}: CreateUserDTO){
        return this.prisma.users.create({
            data:{
                name,
                email,
                password                        
            },
        });
    }

    async get(){
        return this.prisma.users.findMany();
    }

    async getById(id: number){
        await this.exists(id);
        return this.prisma.users.findUnique({
            where:{
                id
            }
        })
    }

    async update(id: number, data: UpdateUserDTO){
        await this.exists(id);

        return this.prisma.users.update({
            data,
            where:{
                id
            }
        })
    }

    async updatePartial(id: number, data: UpdatePatchUserDTO){
        await this.exists(id);
        
        return this.prisma.users.update({
            data,
            where:{
                id
            }
        })
    }

    async delete(id: number){
        await this.exists(id);

        return this.prisma.users.delete({
            where:{
                id
            }
        })
    }

    async exists(id: number){
        if(!(await this.prisma.users.count({
            where:{
                id
            }
        }))){
            throw new NotFoundException('O usuario não existe!')
        }
    }
}