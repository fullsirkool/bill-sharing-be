import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { SenderModule } from 'src/sender/sender.module';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from 'src/user/user.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    UserModule,
    HttpModule,
    SenderModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME },
    }),
    CacheModule.register()
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
