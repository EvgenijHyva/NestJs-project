import { prop } from '@typegoose/typegoose';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';

class ProductCharacteristic {
	@prop()
	name: string;
	@prop()
	value: string;
}

export interface ProductModel extends Base { }
export class ProductModel {
	@prop()	
	image: string;
	@prop()
	title: string;
	@prop()
	price: number;
	@prop()
	oldPrice?: number;
	@prop()
	credit: number;
	@prop()
	description: string;
	@prop()
	advantages: string;
	@prop()
	disAdvantages: string;
	@prop({ type: () => [String] })
	categories: string[];
	@prop({ type: () => [String] })
	tags: string[];
	@prop({ type: () => [ProductCharacteristic], _id: false }) // doesnt need id for that purpose
	characteristics: ProductCharacteristic[];
}
