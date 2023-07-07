import {  IsJWT, IsStrongPassword } from "class-validator";

export class AuthResetDTO{
    
    @IsStrongPassword()
    senhaUsuario:string;
    
    @IsJWT()
    token:string;
     
}