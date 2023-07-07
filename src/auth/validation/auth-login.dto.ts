import {  IsEmail, IsStrongPassword } from "class-validator";

export class AuthLoginDTO{
    
    @IsEmail()
    emailUsuario:string;

    @IsStrongPassword({
        minLength: 6,
        minUppercase: 1
    })
    senhaUsuario:string;   
     
}