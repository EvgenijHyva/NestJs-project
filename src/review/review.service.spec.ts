import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { getModelToken } from 'nestjs-typegoose';
import { ReviewService } from './review.service';

describe('ReviewService', () => {
	let service: ReviewService;

	const exec = { exec: jest.fn() }; // jest.fn allow emulate a function
	const reviewRepositoryFactory = () => ({ // return object with contains find function, 
		// that return review model, that uses chaining pattern, and in the end need to use exec function
		find: () => exec // -> findByProductId method 
	});

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
		providers: [
			ReviewService,
			{ 
				useFactory: reviewRepositoryFactory, // mockmodel 
				provide: getModelToken('ReviewModel') // Model token from app inject new fabric
			}
		],
		}).compile();

		service = module.get<ReviewService>(ReviewService);
	});

	it('define service', () => {
		expect(service).toBeDefined();
	});

	it('findByProductId working', async () => {
		const id = new Types.ObjectId().toHexString(); // uses same id pattern as in prod
		reviewRepositoryFactory().find().exec.mockReturnValueOnce([{ productId: id}]); //exec call should be mocked by jest
		const res = await service.findByProductId(id);
		expect(res[0].productId).toBe(id);
	});
});

// run Unit tests npm run test
