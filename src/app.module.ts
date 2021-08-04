import { Module } from '@nestjs/common';
import { TokenModule } from './token/token.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TokenModule,
  ],
})
export class AppModule {}
