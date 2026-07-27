import {
    IsEmail,
    IsOptional,
    IsString,
    IsStrongPassword,
    IsAlphanumeric,
    Length,
  } from 'class-validator';
  
  export class CreateUserDto {
    @IsEmail()
    email!: string;
  
    @IsAlphanumeric()
    @Length(3, 30)
    username!: string;
  
    @IsStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    password!: string;
  
    @IsOptional()
    @IsString()
    firstName?: string;
  
    @IsOptional()
    @IsString()
    lastName?: string;
  }