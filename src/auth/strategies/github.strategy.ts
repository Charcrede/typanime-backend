import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';




@Injectable() 
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: process.env.BACK_URL! + '/auth/github/callback',
      scope: ['user:email'],
    });
  }

  async validate(_: string, __: string, profile: any) {
    return {
      email: profile.emails?.[0]?.value,
      name: profile.username,
      provider: 'github',
      providerId: profile.id,
    };
  }
}
