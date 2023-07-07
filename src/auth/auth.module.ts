import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./controller/auth.controller";
import { UserModule } from "src/user/user.module";
import { AuthService } from "./services/auth.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports:[JwtModule.register({
        secret:")hU5M73q?*B)HbP#$!q}Qupy8JSJq/^Pn"
    }),
    forwardRef(()=>UserModule),
    PrismaModule
    ],
    controllers:[AuthController],
    providers:[AuthService],
    exports:[AuthService]
})
export class AuthModule{

}