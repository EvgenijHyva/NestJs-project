import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageModel } from './top-page.model';

@Controller('top-page')
export class TopPageController {
	//constructor(private readonly configService: ConfigService) {}

	@Post('save')
	async create(@Body() dto: Omit<TopPageModel, '_id'>) { // exclude _id field
		
	}

	@Get('get/:alias')
	async get(@Param('alias') alias: string) {
		
	}

	@Delete('delete')
	async delete(@Body() dto: string) {

	}

	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindTopPageDto){
		
	}
}
