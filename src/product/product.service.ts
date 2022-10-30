import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { ReviewModel } from 'src/review/review.model';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/product-find.dto';
import { ProductModel } from './product.model';

@Injectable()
export class ProductService {
	constructor(@InjectModel(ProductModel) private readonly productModel: ModelType<ProductModel>) {}

	async create(dto: CreateProductDto) {
		return this.productModel.create(dto);
	}

	async findById(id: string) {
		return this.productModel.findById(id).exec();
	}

	async deleteById(id: string) {
		return this.productModel.findByIdAndDelete(id).exec();
	}

	async updateById(id: string, dto: CreateProductDto) {
		return this.productModel.findByIdAndUpdate(id, dto, { new: true}).exec();
	}

	async findWithReviews(dto: FindProductDto) {
		// https://www.mongodb.com/docs/manual/core/aggregation-pipeline/
		// tslint:disable-next-line: max-line-length
		// https://www.mongodb.com/docs/v5.0/reference/operator/aggregation-pipeline/?_ga=2.102865088.1971013577.1667038395-1422843734.1667038394
		// agregation
		return await this.productModel.aggregate([
			{ 
				$match: { // pipeline
					categories: dto.category
				}
			},
			{	// for stable sort
				$sort: { // otherwise limiting will give a different results
					_id: 1
				}
			},
			{	// pipeline limit can be stable or unstable sort
				$limit: dto.limit
			},
			{
				$lookup: {
					from: 'Review', //collection
					localField: '_id', // used for search
					foreignField: 'productId',
					as: 'reviews' // alias
				}
			},
			// pipeline operators
			// tslint:disable-next-line: max-line-length
			// https://www.mongodb.com/docs/v4.4/reference/operator/aggregation/?_ga=2.74601298.1971013577.1667038395-1422843734.1667038394
			{
				$addFields: {
					reviewCount: { $size: '$reviews' }, // array size
					reviewAvg: { $avg: '$reviews.rating' }, // calculation by numeric value in review object
					reviews: {
						$function: {
							body: `function(reviews) {
								reviews.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
								return reviews;
							}`,
							args: ['$reviews'],
							lang: 'js'
						}
					}
				}
			}
		]).exec() as (ProductModel & { // cast to right type 
			review: ReviewModel[], 
			reviewCount: number, 
			reviewAvg: number
		})[]; 
	}
}
