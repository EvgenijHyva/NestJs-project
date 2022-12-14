import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopLevelCategory, TopPageModel } from './top-page.model';

@Injectable()
export class TopPageService {
	constructor(@InjectModel(TopPageModel) private readonly topPageModel: ModelType<TopPageModel>) {}

	async create(dto: CreateTopPageDto) {
		return this.topPageModel.create(dto);
	}

	async findById(id: string) {
		return this.topPageModel.findById(id).exec();
	}

	async findByAlias(alias: string){
		return this.topPageModel.findOne({ alias }).exec();
	}

	async findByCategory(firstLevelCategory: TopLevelCategory) {
		return this.topPageModel.aggregate([
			{
				$match: {
					firstLevelCategory
				}
			},
			{
				$group: {
					_id: {
						secondCategory: '$secondCategory',
					},
					pages: {
						$push: {
							alias: '$alias',
							title: '$title'
						}
					}
				}
			}
		]).exec();
	}
	async findByCategoryChainable(firstLevelCategory: TopLevelCategory){
		return this.topPageModel.aggregate()
			.match({
				firstLevelCategory
			})
			.group({
				_id: {
					secondCategory: '$secondCategory',
					category: '$category'
				},
				pages: {
					$push: {
						hh: '$hh',
						seo: '$seoText'
					}
				}
			})
			.exec();
	}

	async findAll() {
		return this.topPageModel.find({}).exec();
	}

	async deleteById(id: string) {
		return this.topPageModel.findByIdAndRemove(id).exec();
	}

	async updateById(id: string, dto: CreateTopPageDto) {
		return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}

	async findByText(text: string){
		return this.topPageModel.find( 
			{ 
				$text: {
					$search: text,
					$caseSensitive: false
				}
			}
		).exec();
	}
}
