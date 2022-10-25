import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
	return {
		uri: getMongoString(configService),
		...getMongoOptions()
	};
};




const getMongoString = (configService: ConfigService): string => {
	// mongo connection string
	// mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]
	return 'mongodb://' + 
			configService.get('MONGO_LOGIN') + ':' +
			configService.get('MONGO_PASSWORD') + '@' +
			configService.get('MONGO_HOST') + ':' +
			configService.get('MONGO_PORT') + '/' +
			configService.get('MONGO_AUTHDATABASE');
};


const getMongoOptions = () => ({
	//useCreateIndex: true,
	useUnifiedTopology:true
});