import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Logger } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { Types, disconnect } from 'mongoose';
import { REVIEW_NOT_FOUND } from '../src/review/review.constants';
import { AuthDto } from 'src/auth/dto/auth.dto';


const productId = new Types.ObjectId().toHexString();
const testDto: CreateReviewDto = {
	name: 'Test',
	title: 'Title',
	description: 'Description',
	rating: 5,
	productId
};

const loginDto: AuthDto = {
	'login': 'User1@user.com',
	'password': 'pass'
};

describe('Review module (e2e)', () => {
	let app: INestApplication; // app init
	let createdId: string;
	let token: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
	}).compile();

	app = moduleFixture.createNestApplication();
		await app.init();
		app.useLogger(new Logger());
		
	const { body } = await request(app.getHttpServer())
		.post('/auth/login')
		.send(loginDto);
	token = body.access_token;
	});

	it('/review/create (POST) - success',async () => {
		return request(app.getHttpServer())
			.post('/review/create') // doesnt need to insert api, because test working with httpServer directly
			.send(testDto) // Dto object 
			.expect(201) // Status code created on post
			.then(({ body }: request.Response) => {
				createdId = body._id;
				expect(createdId).toBeDefined();
		});
	});

	it('/review/create (POST) - fail rating validation', async () => {
		return request(app.getHttpServer())
			.post('/review/create') 
			.send({ 
				...testDto, 
				rating: 0 // between 1 and 5
			}) 
			.expect(400)
			.then(({ body }: request.Response) => {
				// tslint:disable-next-line: no-console
				console.log(body);
		});
	});

	it('/review/byProduct/:productId (GET) - success ', async () => {
		return request(app.getHttpServer())
			.get('/review/byProduct/' + productId)
			.set('Authorization', 'Bearer ' + token)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBeGreaterThanOrEqual(1);
			});
	});

	it('/review/byProduct/:productId (GET) - fail ', async () => {
		return request(app.getHttpServer())
			.get('/review/byProduct/' + new Types.ObjectId().toHexString()) // some random id
			.set('Authorization', 'Bearer ' + token)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(0);
			});
	});

	it('/review/:id (DELETE) - success', async () => {
		return request(app.getHttpServer())
			.delete('/review/' + createdId)
			.set('Authorization', 'Bearer ' + token)
			.expect(200);
	});

	it('/review/:id (DELETE) - fail', async () => {
		const randomId: string = new Types.ObjectId().toHexString();
		return request(app.getHttpServer())
			.delete('/review/' + randomId)
			.set('Authorization', 'Bearer ' + token)
			.expect(404, {
				statusCode: 404,
				message: REVIEW_NOT_FOUND(randomId)
			});
	});	

	it('/review/:id (DELETE) - fail (Unauthorized)', async () => {
		const randomId: string = new Types.ObjectId().toHexString();
		return request(app.getHttpServer())
			.delete('/review/' + randomId)
			.expect(401);
	});	

	afterAll(() => {
		disconnect();
	});
});
