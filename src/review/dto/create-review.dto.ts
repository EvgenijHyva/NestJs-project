import { IsString, IsNumber, Max, Min, IsDefined } from 'class-validator';

export class CreateReviewDto {
	@IsString()
	name: string;
	@IsDefined()
	@IsString()
	title: string;
	@IsString()
	description: string;
	@Max(5, { message: 'rating cant be greather than 5!!!'})
	@Min(1, { message: 'rating cant be less than 1!!!'})
	@IsNumber()
	rating: number;
	@IsDefined()
	@IsString()
	productId: string; // Types.ObjectId (lookup)
}