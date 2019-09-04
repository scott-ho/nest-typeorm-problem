import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserQueryDto {
  @IsEmail()
  email: string;
}
