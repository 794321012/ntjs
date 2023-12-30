import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { UserInfoRespone } from './vo/user-info.vo';
import { UserService } from './user.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/Login.dto';
import { TokenResponse } from './vo/vo.token';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  /**
   * 注册
   */
  @ApiBody({ type: RegisterDTO })
  @ApiOkResponse({ description: '注册', type: UserInfoRespone })
  @Post('register')
  async register(
    @Body()
    registerDTO: RegisterDTO,
  ): Promise<UserInfoRespone> {
    console.log(registerDTO, 'register');
    return this.userService.register(registerDTO);
  }

  /**
   * 登录
   */
  @ApiBody({ type: LoginDTO })
  @ApiOkResponse({ description: '登录', type: TokenResponse })
  @Post('login')
  async login(
    @Body()
    loginDTO: LoginDTO,
  ): Promise<any> {
    return this.userService.login(loginDTO);
  }
}
