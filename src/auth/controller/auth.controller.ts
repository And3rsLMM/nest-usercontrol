import { AuthService } from './../services/auth.service';
import { Body, Controller, Headers, Post, Req, UseGuards } from "@nestjs/common";
import { AuthForgetDTO } from "src/auth/validation/auth-forget.dto";
import { AuthLoginDTO } from "src/auth/validation/auth-login.dto";
import { AuthRegisterDTO } from "src/auth/validation/auth-register.dto";
import { AuthResetDTO } from "src/auth/validation/auth-reset.dto";
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}
    
    @Post('login')
    async login(@Body() {emailUsuario, senhaUsuario}: AuthLoginDTO){
        return this.authService.login(emailUsuario, senhaUsuario)
    }

    @Post('register')
    async register(@Body() body: AuthRegisterDTO){
        return this.authService.register(body)
    }

    @Post('forget')
    async forget(@Body() {emailUsuario}: AuthForgetDTO){
        return this.authService.forget(emailUsuario)
    }

    @Post('reset')
    async reset(@Body() {senhaUsuario, token}: AuthResetDTO){
        return this.authService.reset(senhaUsuario, token)
    }

    @UseGuards(AuthGuard)
    @Post('tokentest')
    async tokentest(@User() user){
        return {user};
    }    
    
    //Acessando a roda e testando o token sem Guard
    /*@Post('tokentest')
    async tokentest(@Headers('authorization') token){
        return this.authService.checkToken((token ?? '').split(' ')[1]);
    }*/
}