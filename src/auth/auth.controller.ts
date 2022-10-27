import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
	// for admin only
	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: AuthDto) { // DTO data transfer object (Body)
		return 
	}

	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: AuthDto) {
		
	}
}
