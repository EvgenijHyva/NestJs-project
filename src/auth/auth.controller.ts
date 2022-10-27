import { BadRequestException, Body, Controller, 
	HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ALREADY_REGISTERED_ERROR } from './auth.constants';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	// for admin only
	@UsePipes(new ValidationPipe()) // validate dto
	@Post('register')
	async register(@Body() dto: AuthDto) { // DTO data transfer object (Body)
		const oldUser = await this.authService.findUser(dto.login);
		if (oldUser) {
			throw new BadRequestException(ALREADY_REGISTERED_ERROR(dto.login));
		}
		return this.authService.createUser(dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() { login, password }: AuthDto) {
		const { email } = await this.authService.validateUser(login, password);
		return this.authService.login(email);
	}
}
