import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { FindProductDto } from './dto/product-find.dto';
import { ProductModel } from './product.model';

@Controller('product')
export class ProductController {
	// CRUD 
	@Post('create')
	async create(@Body() dto: Omit<ProductModel, '_id'>) { // exclude _id field
		
	}

	@Get(':id')
	async get(@Param('id') id: string) {
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {

	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: ProductModel) {
		
	}

	@HttpCode(200)
	@Post()
	async find(@Body() dto: FindProductDto) {
		
	}
}
