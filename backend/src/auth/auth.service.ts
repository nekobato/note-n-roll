import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { generateUserId } from 'src/utils/generateId';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.user({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { password: _, ...result } = user;
    return result;
  }

  async signin(user: { email: string; password: string }) {
    const userResult = await this.validateUser(user.email, user.password);
    return {
      user: userResult,
      access_token: this.jwtService.sign(user),
    };
  }

  async signup(user: { email: string; username: string; password: string }) {
    const newUser = {
      id: generateUserId(),
      email: user.email,
      username: user.username,
      password: user.password,
    };
    const createdUser = await this.userService.create(newUser);
    const auth = this.signin({
      email: createdUser.email,
      password: createdUser.password,
    });
    return {
      user: createdUser,
      auth,
    };
  }
}
