import { Module, forwardRef } from "@nestjs/common";
import { UserController } from "./controller/user.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserService } from "./services/user.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [PrismaModule, forwardRef(()=> AuthModule)],
    controllers:[UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}