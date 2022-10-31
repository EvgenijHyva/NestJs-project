import { prop, index } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum TopLevelCategory {
	Cources = 1,
	Services = 2,
	Books = 3,
	Products = 4 
}

export class HhData {
	@prop()
	count: number;
	@prop()
	juniorSalary: number;
	@prop()
	middleSalary: number;
	@prop()
	seniorSalary: number;
}

export class TopPageAdvantage {
	@prop()
	title: string;
	@prop()
	description: string;
}

export interface TopPageModel extends Base { } //interface required to export, otherwise it cant merge this declarations
@index({ '$**': 'text' }) // for all fields and nested. For small projects. 
// { title: 'text', seoText: 'text' } for defining search fields in mongo
export class TopPageModel extends TimeStamps {
	@prop({ enum: TopLevelCategory, type: () => Number }) // enum uses numbers, it's good to use type: Number 
	firstLevelCategory: TopLevelCategory;
	@prop()
	secondCategory: string;
	@prop({ unique: true })
	alias: string;
	@prop()
	title: string;
	@prop()
	category: string;
	@prop({ type: () => HhData })
	hh?: HhData;
	@prop({ type: () => [TopPageAdvantage], _id: true })
	advantages: TopPageAdvantage[];
	@prop()
	seoText: string;
	@prop()
	tagsTitle: string;
	@prop({ type: () => [String] })
	tags: string[];
}
