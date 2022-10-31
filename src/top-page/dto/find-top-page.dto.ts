import { IsEnum } from 'class-validator';
import { TopLevelCategory } from '../top-page.model';

export class FindTopPageDto {
	@IsEnum(TopLevelCategory, { message: `firstLevelCategory should be defined as TopLevelCategory enum`})
	firstLevelCategory: TopLevelCategory;
}