import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Logger } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { USER_NOT_FOUND } from '../src/auth/auth.constants';


const loginDto: AuthDto = {
	'login': 'User1@user.com',
	'password': 'pass'
};

describe('Auth module (e2e)', () => {
	let app: INestApplication; // app init

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
	}).compile();

	app = moduleFixture.createNestApplication();
		await app.init();
		app.useLogger(new Logger());
	});

	it('/auth/login/ (POST) - success ', async () => {
		return request(app.getHttpServer())
			.post('/auth/login/' )
			.send(loginDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.access_token).toBeDefined();
			});
	});

	it('/auth/login/ (POST) - fail login ', async () => {
		return request(app.getHttpServer())
			.post('/auth/login/' )
			.send({
				...loginDto,
				login: 'NotVallogin'
			})
			.expect(400); // 400 - Bad request
	});

	it('/auth/login/ (POST) - fail login email ', async () => {
		const login = 'not@valid.login';
		return request(app.getHttpServer())
			.post('/auth/login/' )
			.send({
				...loginDto,
				login
			})
			.expect(401, {
				'statusCode': 401,
				'message': USER_NOT_FOUND(login),
				'error': 'Unauthorized'
			}); 
	});

	it('/auth/login/ (POST) - fail password', async () => {
		return request(app.getHttpServer())
			.post('/auth/login/' )
			.send({
				...loginDto,
				password: 'NotValPass'
			})
			.expect(401,{
				'statusCode': 401,
				'message': 'Wrong password',
				'error': 'Unauthorized'
			}); // 401 - Unauthorized
	});

	afterAll(() => {
		disconnect();
	});
});
