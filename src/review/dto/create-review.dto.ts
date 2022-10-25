export class CreateReviewDto {
	name: string;
	title: string;
	description: string;
	rating: number;
	productId: string; // Types.ObjectId (lookup)
}