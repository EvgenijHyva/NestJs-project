import { IsDefined, IsEmail, IsString } from 'class-validator';

export class AuthDto {
	@IsEmail()
	@IsDefined()
	@IsString()
	login: string;
	@IsDefined()
	@IsString()
	password: string;
}