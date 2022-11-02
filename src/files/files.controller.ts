import { Controller, HttpCode, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { FileElementResponse } from './dto/file-response-elent.response';
import { FilesService } from './files.service';
import { MFile } from './mfile.class';

@Controller('files')
export class FilesController {
	
	constructor(private readonly fileService: FilesService) {}

	@Post('upload')
	@HttpCode(200)
	@UseGuards(JwtAuthGuard)
	@UseInterceptors(FileInterceptor('files'))
	async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileElementResponse[]>{
		const saveFileArray: MFile[] = [new MFile(file)];
		if (file.mimetype.includes('image')) {
			const webp = await this.fileService.convertToWebp(file.buffer);
			saveFileArray.push(new MFile({
				originalname: `${file.originalname.split('.')[0]}.webp`,
				buffer: file.buffer
			}));
		}
		return this.fileService.saveFiles(saveFileArray);
	}
}
