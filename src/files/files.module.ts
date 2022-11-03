import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';

@Module({
	imports: [
		ServeStaticModule.forRoot({ // for serving resources from dedicated folder
			rootPath: `${path}/uploads`, // from
			serveRoot: '/static/' // prefix
		}) 
	], 
	controllers: [FilesController],
	providers: [FilesService]
})
export class FilesModule {}
