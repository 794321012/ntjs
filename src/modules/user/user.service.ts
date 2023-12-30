import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram.util';
import { User } from './entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async checkRegisterFrom(registerDTO: RegisterDTO): Promise<any> {
    if (registerDTO.password !== registerDTO.passwordRepeat)
      throw new NotFoundException('两次输入的密码不一致,请检查');

    const { mobile } = registerDTO;
    const hasUser = await this.userRepository.findOneBy({ mobile });
    if (hasUser) {
      throw new NotFoundException('用户已存在');
    }
  }
  /**
   * 注册
   */
  async register(registerDTO: RegisterDTO): Promise<any> {
    await this.checkRegisterFrom(registerDTO);
    const { nickname, password, mobile } = registerDTO;
    const salt = makeSalt(); //制作密码盐
    const hashPwd = encryptPassword(password, salt); //加密密码

    const newUser: User = new User();
    newUser.nickname = nickname;
    newUser.mobile = mobile;
    newUser.password = hashPwd;
    newUser.salt = salt;

    return await this.userRepository.save(newUser);
  }

  // 登陆校验用户信息
  async checkLoginFrom(loginDTO: LoginDTO): Promise<any> {
    const { mobile, password } = loginDTO;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.salt')
      .addSelect('user.password')
      .where('user.mobile = :mobile', { mobile })
      .getOne();

    if (!user) {
      throw new NotFoundException('用户不存在');
    }
    const { password: dbPassword, salt } = user;
    const currentHashPassword = encryptPassword(password, salt);
    if (currentHashPassword !== dbPassword) {
      throw new NotFoundException('密码错误');
    }
    return user;
  }

  /**
   * 生成token
   */
  async token(user: User) {
    const { mobile, nickname, id } = user;
    const token = this.jwtService.sign({ mobile, nickname, id });
    return token;
  }

  /**
   * 登录
   */
  async login(loginDTO: LoginDTO) {
    const user = await this.checkLoginFrom(loginDTO);
    const token = await this.token(user);
    return {
      info: {
        token,
      },
    };
  }
}
