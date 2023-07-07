import { IsEmail, IsEnum, IsInt, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { Role } from "src/enums/role.enums";

export class CreateUserDTO {

    @IsString()
    name: string;
    
    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 6,
        minUppercase: 1
    })
    password: string;

    @IsOptional()
    @IsEnum(Role)
    @IsInt()
    role: number;

    @IsString()
    createdAt: string;

    @IsString()
    updatedAt: string;   
}