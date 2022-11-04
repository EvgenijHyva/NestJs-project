import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { TELEGRAM_MODULE_OPTIONS_PROVIDER_NAME } from './telegram.constants';
import { ITelegramModuleAsyncOptions } from './telegram.interface';
import { TelegramService } from './telegram.service';

@Global() // + for root is defined -> doesnt need to inject in other modules
@Module({})
export class TelegramModule {
	static forRootAsync(options: ITelegramModuleAsyncOptions): DynamicModule {
		const asyncOptionsProvider = TelegramModule.createAsyncOptionsProvider(options);
		return {
			module: TelegramModule,
			imports: options.imports,
			providers: [TelegramService, asyncOptionsProvider],
			exports: [TelegramService]
		};
	}

	private static createAsyncOptionsProvider(options: ITelegramModuleAsyncOptions): Provider {
		return {
			provide: TELEGRAM_MODULE_OPTIONS_PROVIDER_NAME,
			useFactory: async (...args: any[]) => {
				const config = await options.useFactory(...args); 
				return config;
			},
			inject: options.inject || []
		};
	} 
}
