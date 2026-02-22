// auth/strategies/google.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';



@Injectable() 
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.BACK_URL! +'/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(_: string, __: string, profile: any) {
    return {
      email: profile.emails[0].value,
      name: profile.displayName,
      provider: 'google',
      providerId: profile.id,
    };
  }
}
