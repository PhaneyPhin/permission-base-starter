import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { MinioService } from '../minio.service';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { TOKEN_NAME } from '@modules/auth';

@ApiBearerAuth(TOKEN_NAME)
@Controller('upload')
export class FileController {
    constructor(private minioService: MinioService) {}

    @Post('image')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'image file',
        schema: {
        type: 'object',
        properties: {
            file: {
            type: 'string',
            format: 'binary',
            },
        },
        },
    })
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Multer.File) {
        return await this.minioService.uploadImage(new Date().getTime() + '-' + file.originalname, file.buffer);
    }
}
