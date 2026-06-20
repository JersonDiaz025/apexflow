import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'SECRET_KEY_SUPER_SECRETA_APEXFLOW',
    });
  }

  async validate(payload: any) {
    // Lo que retornes aquí se inyectará automáticamente en req.user
    return { userId: payload.sub, email: payload.email };
  }
}
