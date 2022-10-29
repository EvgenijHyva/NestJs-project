import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/product-find.dto';
import { PRODUCT_NOT_FOUND_ERROR } from './product.constants';
import { ProductModel } from './product.model';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}
	
	// CRUD 
	@Post('create')
	async create(@Body() dto: CreateProductDto) { 
		return this.productService.create(dto);
	}

	@Get(':id')
	async get(@Param('id') id: string) {
		const product = await this.productService.findById(id);
		if(!product){
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR(id));
		}
		return product;
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletedProduct = await this.productService.deleteById(id);
		if (!deletedProduct) {
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR(id));
		}
	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: ProductModel) {
		const updatedProduct = await this.productService.updateById(id, dto);
		if (!updatedProduct) {
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR(id));
		}
		return updatedProduct;
	}

	@HttpCode(200)
	@Post()
	async find(@Body() dto: FindProductDto) {
		
	}
	

	checkProductExists(product: ProductModel, id: string): void | never {
		if (!product) {
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR(id));
		}
	}
}
