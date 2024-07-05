import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Painting } from './painting.model';
import { CreatePaintingDto } from './dto/create-painting.dto';
import { UpdatePaintingDto } from './dto/update-painting.dto';
import { UploadService } from '../upload/upload.service';
import * as path from 'path';
import { Express } from 'express';

@Injectable()
export class PaintingsService {
  constructor(
    @InjectModel(Painting)
    private readonly paintingModel: typeof Painting,
    private readonly uploadService: UploadService,
  ) {}

  async create(
    createPaintingDto: CreatePaintingDto,
    imageUrl?: string,
    imageFilename?: string,
  ): Promise<Painting> {
    return this.paintingModel.create({
      ...createPaintingDto,
      imageUrl,
      imageFilename,
    });
  }

  async findAll(): Promise<Painting[]> {
    return this.paintingModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Painting> {
    const painting = await this.paintingModel.findOne({
      where: { id },
      include: { all: true },
    });
    if (!painting) {
      throw new NotFoundException(`Painting with ID ${id} not found`);
    }
    return painting;
  }

  async update(
    id: number,
    updatePaintingDto: UpdatePaintingDto,
    file?: Express.Multer.File,
  ): Promise<Painting> {
    const painting = await this.findOne(id);

    if (file) {
      if (painting.imageFilename) {
        this.uploadService.deleteFile(painting.imageFilename);
      }

      const imageFilename = `painting_${id}_${updatePaintingDto.title || painting.title}${path.extname(file.originalname)}`;
      const imageUrl = `/uploads/${imageFilename}`;

      await painting.update({ ...updatePaintingDto, imageUrl, imageFilename });
    } else {
      await painting.update(updatePaintingDto);
    }

    return painting;
  }

  async remove(id: number): Promise<void> {
    const painting = await this.findOne(id);
    if (painting.imageFilename) {
      this.uploadService.deleteFile(painting.imageFilename);
    }
    await painting.destroy();
  }
}
