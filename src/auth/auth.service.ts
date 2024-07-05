import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from '../users/user.model';
import { Role } from '../roles/role.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    if (!email || !password) {
      throw new UnauthorizedException('Email and password must be provided');
    }

    const user = await User.findOne({
      where: { email: email },
      include: [Role],
    });

    if (user && (await this.comparePasswords(password, user.password))) {
      const { password, ...result } = user.get({ plain: true });
      return result;
    }

    return null;
  }

  async login(user: any) {
    const roles = user.roles.map((role) => role.label);
    const payload = { email: user.email, sub: user.id, roles };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION'),
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION'),
    });

    if (!user.id) {
      throw new UnauthorizedException('User ID is missing');
    }

    await User.update({ refreshToken }, { where: { id: user.id } });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refresh(token: string) {
    const payload = this.jwtService.verify(token, { ignoreExpiration: true });
    const user = await User.findOne({
      where: { id: payload.sub, refreshToken: token },
      include: [Role],
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    const newPayload = {
      email: user.email,
      sub: user.id,
      roles: user.roles.map((role) => role.label),
    };
    const newAccessToken = this.jwtService.sign(newPayload, {
      expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION'),
    });
    return {
      access_token: newAccessToken,
    };
  }

  async createUser(
    email: string,
    password: string,
    lastname: string,
    firstname: string,
  ) {
    const hashedPassword = await this.hashPassword(password);
    const user = await this.usersService.create({
      email,
      password: hashedPassword,
      lastname,
      firstname,
    });
    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds =
      parseInt(this.configService.get<string>('SALT_ROUNDS'), 10) || 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }

  private async comparePasswords(
    password: string,
    storedPasswordHash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, storedPasswordHash);
  }
}
