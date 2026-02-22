// auth/auth.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

 async loginOAuth(oauthUser: any) {
  const user = await this.usersService.findOrCreateOAuthUser(oauthUser);
  
  const payload = {
    sub: user.id,
    provider: user.provider,
  };
const strToken = JSON.stringify({
    access_token: this.jwtService.sign(payload),
    user,
  })
  new Logger("Token : " + strToken)
  return {
    access_token: this.jwtService.sign(payload),
    user,
  };
}
}
