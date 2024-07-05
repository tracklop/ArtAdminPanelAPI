import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaintingsService } from './paintings.service';
import { PaintingsController } from './paintings.controller';
import { Painting } from './painting.model';
import { UploadModule } from '../upload/upload.module';
import { UploadService } from '../upload/upload.service';

@Module({
  imports: [SequelizeModule.forFeature([Painting]), UploadModule],
  providers: [PaintingsService, UploadService],
  controllers: [PaintingsController],
})
export class PaintingsModule {}
