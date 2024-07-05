import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaintingsService } from './paintings.service';
import { CreatePaintingDto } from './dto/create-painting.dto';
import { UpdatePaintingDto } from './dto/update-painting.dto';
import { UploadService } from '../upload/upload.service';
import * as path from 'path';
import { Express } from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('paintings')
export class PaintingsController {
  constructor(
    private readonly paintingsService: PaintingsService,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createPaintingDto: CreatePaintingDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const painting = await this.paintingsService.create(createPaintingDto);
    if (file) {
      const imageFilename = `painting_${painting.id}_${createPaintingDto.title}${path.extname(file.originalname)}`;
      const imageUrl = `/uploads/${imageFilename}`;
      await this.paintingsService.update(
        painting.id,
        { imageUrl, imageFilename } as UpdatePaintingDto,
        file,
      );
    }
    return painting;
  }

  @Get()
  async findAll() {
    return this.paintingsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.paintingsService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updatePaintingDto: UpdatePaintingDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.paintingsService.update(+id, updatePaintingDto, file);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.paintingsService.remove(+id);
  }
}
