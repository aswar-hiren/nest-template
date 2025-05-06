// src/users/dto/create-user.dto.ts
import { IsNotEmpty, MinLength } from 'class-validator';

export class signInDto {
  @IsNotEmpty()
  username: string;

  @MinLength(6)
  password: string;
}
