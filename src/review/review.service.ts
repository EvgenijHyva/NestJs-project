import { Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewModel } from './review.model';

@Injectable()
export class ReviewService {
	// for using db needed model
	constructor(@InjectModel(ReviewModel) private readonly reviewModel: ModelType<ReviewModel> ) {}

	async create(dto: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
		return this.reviewModel.create(dto);
	}

	async delete(id: string): Promise<DocumentType<ReviewModel> | null> {
		return this.reviewModel.findByIdAndDelete(id).exec();
	}

	async findByProductId(productId: string): Promise<DocumentType<ReviewModel>[]> { // returns array of reviews
		return this.reviewModel.find({ productId: new Types.ObjectId(productId)}).exec(); // find uses query
	}

	async deleteByProductId(productId: string) { 
		return this.reviewModel.deleteMany({ productId: new Types.ObjectId(productId)}).exec();
	}
}
