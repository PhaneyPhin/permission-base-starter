import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';
import { MinioProvider } from './minio.provider';

@Injectable()
export class MinioService {
  private readonly client: Minio.Client;

  constructor(private readonly minioProvider: MinioProvider) {
    this.client = this.minioProvider.createClient();
  }

  async uploadFile(bucketName: string, filePath: string, file: Buffer) {
    try {
        await this.client.putObject(bucketName, filePath, file);
        return filePath;
    } catch (error) {
        console.error('uploadFile', error);
        throw error;
    }
  }

  async generateTemLink(bucketName: string, objectName: string, expiry = 3600): Promise<string> {
    try {
      return await this.client.presignedUrl('GET', bucketName, objectName, expiry);
    } catch (error) {
      console.error('Error generating temporary link:', error);
      return null;
    }
  }

  async getImageLink(filePath: string) {
    return this.generateTemLink('images', filePath);
  }

  async uploadImage(filePath: string, file: Buffer) {
    console.log('uploadImage', filePath);
    return this.uploadFile('images', filePath, file);
  }

  async uploadDocument(filePath: string, file: Buffer) {
    return this.uploadFile('documents', filePath, file);
  }
}
