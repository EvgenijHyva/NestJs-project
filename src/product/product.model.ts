export class ProductModel {
	_id: number;	
	image: string;
	title: string;
	price: number;
	oldPrice: number;
	credit: number;
	calculatedRating: number;
	description: string;
	advantages: string;
	desAdvantages: string;
	categories: string[];
	tags: string[];
	characteristics: {
		[key: string]: string;
	};
}
