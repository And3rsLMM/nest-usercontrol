import { UserService } from './../services/user.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from "../validation/create-user.dto";
import { UpdateUserDTO } from "../validation/update-user.dto";
import { UpdatePatchUserDTO } from "../validation/update-patch-user.dto";
import { LogInterceptor } from 'src/util/log.interceptor';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enums';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';

//@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService){}

    
    @Post()
    async create(@Body() data: CreateUserDTO){
        return this.userService.create(data);
    }
    
    @Get()
    async read(){
        return this.userService.get();
    }

    @Get(':id')
    async readById(@ParamId() id: number) {//decorantor @ParamId personalizado para retornar id do tipo Number
        return this.userService.getById(id);
    }

    @Put(':id')
    async update(@Body() data: UpdateUserDTO, @Param('id', ParseIntPipe) id: number){
        return this.userService.update(id, data);
    }

    @Patch('id')
    async updatePartial(@Body() data: UpdatePatchUserDTO, @Param('id', ParseIntPipe) id: number){
        return this.userService.updatePartial(id, data)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return this.userService.delete(id);
    }
}