// auth/jwt.strategy.ts
import dotenv from 'dotenv';
import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

dotenv.config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || '',
    });
  }

  async validate(payload: { sub: number }) {
    Logger.debug(`Validating JWT for user ID: ${payload.sub}`);
    return { id: payload.sub };
  }
}