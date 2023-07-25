import { PrismaService } from './../prisma/prisma.service';
import { SignUpDto, SignInDto } from './auth.dto';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { getEmailContent } from './constants';
import { SenderService } from 'src/sender/sender.service';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly senderService: SenderService,
    private jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}
  async signUp(signUpDto: SignUpDto) {
    try {
      const { email, password, firstName, lastName, gender } = signUpDto;
      const findUser = await this.prismaService.user.findUnique({
        where: { email },
      });
      if (!findUser) {
        const bcryptSalt = +process.env.BCRYPT_SALT;
        const hash = await bcrypt.hash(password, bcryptSalt);
        const sendUser = { email, password: hash, firstName, lastName, gender };
        const createdUser = await this.prismaService.user.create({
          data: sendUser,
        });
        const mailSubject = `Account Verification`;
        const mailContent = `Please enter the link to verify your account: ${createdUser.capcha}`;
        const html = getEmailContent(
          process.env.MAIL_REDIRECT_URL,
          createdUser.capcha,
        );
        this.senderService.sendEmail({
          to: createdUser.email,
          subject: mailSubject,
          text: mailContent,
          html,
        });
        return { msg: 'you have signed up' };
      } else {
        throw new Error('Email has already been registered!');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async signIn(signInDto: SignInDto) {
    try {
      const { email, password } = signInDto;
      const findUser = await this.prismaService.user.findUnique({
        where: { email },
      });
      if (findUser) {
        const isMatch = await bcrypt.compare(password, findUser.password);
        if (isMatch) {
          if (findUser.activated) {
            const payload = { id: findUser.id };
            const token = await this.jwtService.signAsync(payload);
            return {
              access_token: token,
            };
          } else {
            throw new Error(
              'Your account has not already activated. Please check your email to verify!',
            );
          }
        } else {
          throw new Error('Wrong email or password!');
        }
      } else {
        throw new Error('Email has not already been registered!');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async signInWithGoogle(token: string) {
    try {
      const url = process.env.GOOGLE_INFOR_URL;
      const { data } = await firstValueFrom(
        this.httpService
          .get(url, {
            params: {
              id_token: token,
            },
          })
          .pipe(
            catchError((error: AxiosError) => {
              console.error(error.response.data);
              throw 'An error happened!';
            }),
          ),
      );
      console.log(data)
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async verify(capcha: string): Promise<boolean> {
    try {
      const findUser = await this.prismaService.user.findFirst({
        where: { capcha },
      });
      if (findUser) {
        const updatedUser = await this.prismaService.user.update({
          where: { id: findUser.id },
          data: {
            capcha: '',
            activated: true,
          },
        });
        return true;
      } else {
        throw new Error('Could not find account with capcha!');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
