import { Injectable } from '@nestjs/common';
import { FileElementResponse } from './dto/file-response-elent.response';
import { format } from 'date-fns';
import { path } from 'app-root-path'; // app root directory
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';
import { MFile } from './mfile.class';

@Injectable()
export class FilesService {
	async saveFiles(files: MFile[]): Promise<FileElementResponse[]> {
		const dateFolder = format(new Date(), 'yyyy-MM-dd');
		const uploadfolder = `${path}/uploads/${dateFolder}`;
		await ensureDir(uploadfolder);
		const resp: FileElementResponse[] = [];
		
		for (const file of files) {
			await writeFile(`${uploadfolder}/${file.originalname}`, file.buffer);
			resp.push({
				url: `${dateFolder}/${file.originalname}`,
				name: file.originalname
			});
		}
		return resp;
	}

	async convertToWebp(file: Buffer): Promise<Buffer> {
		return sharp(file).webp().toBuffer();
	}
}
