import { TopLevelCategory } from 'src/top-page/top-page.model';

type routeMapType = Record<TopLevelCategory, string>;

export const CATEGORY_URL: routeMapType = {
	1: '/cources',
	2: '/services',
	3: '/books',
	4: '/products'
};