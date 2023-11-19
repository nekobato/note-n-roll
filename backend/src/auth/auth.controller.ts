import { Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/auth/signin')
  async signin(@Request() req) {
    return this.authService.signin(req.body);
  }

  @Post('/auth/signup')
  async signup(@Request() req) {
    return this.authService.signup(req.body);
  }
}
