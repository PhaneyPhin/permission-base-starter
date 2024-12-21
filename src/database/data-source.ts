import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

ConfigModule.forRoot({
    envFilePath: '.env',
});

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('TYPEORM_HOST', 'localhost'),
  port: configService.get<number>('TYPEORM_PORT', 5432),
  username: configService.get<string>('TYPEORM_USERNAME', 'postgres'),
  password: configService.get<string>('TYPEORM_PASSWORD', 'password'),
  database: configService.get<string>('TYPEORM_DATABASE', 'nestjs_sample'),
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/admin/*{.ts,.js}'],
  synchronize: false,
});
console.log( AppDataSource)