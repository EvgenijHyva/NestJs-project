import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, 
	Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { text } from 'node:stream/consumers';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TOP_PAGE_NOT_FOUND_ERROR } from './top-page.constants';
import { TopPageService } from './top-page.service';

@Controller('top-page')
export class TopPageController {
	constructor(private readonly topPageService: TopPageService) {}

	@UseGuards(JwtAuthGuard)
	@Post('save')
	async create(@Body() dto: CreateTopPageDto) { 
		return this.topPageService.create(dto);
	}

	@UseGuards(JwtAuthGuard)
	@Get('get/:id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const page = await this.topPageService.findById(id);
		if(!page) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR(id));
		}
		return page;
	}

	@UseGuards(JwtAuthGuard)
	@Get('getByAlias/:alias')
	async getByAlias(@Param('alias') alias: string) {
		const page = await this.topPageService.findByAlias(alias);
		if(!page) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR(alias));
		}
		return page;
	}

	@UseGuards(JwtAuthGuard)
	@Delete('delete/:id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedPage = await this.topPageService.deleteById(id);
		if(!deletedPage) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR(id));
		}
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateTopPageDto) {
		const updatedPage = await this.topPageService.updateById(id, dto);
		if(!updatedPage) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR(id));
		}
		return updatedPage;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindTopPageDto){
		return this.topPageService.findByCategory(dto.firstLevelCategory);
	}

	@Get('textSearch/:text')
	// tslint:disable-next-line: no-shadowed-variable
	async textSearch(@Param('text') text: string) {
		return this.topPageService.findByText(text);
	}
}
