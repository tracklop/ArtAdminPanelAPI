import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sale } from './sale.model';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(Sale)
    private readonly saleModel: typeof Sale,
  ) {}

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    return this.saleModel.create(createSaleDto);
  }

  async findAll(): Promise<Sale[]> {
    return this.saleModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Sale> {
    const sale = await this.saleModel.findOne({
      where: { id },
      include: { all: true },
    });
    if (!sale) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }
    return sale;
  }

  async update(id: number, updateSaleDto: UpdateSaleDto): Promise<Sale> {
    const sale = await this.findOne(id);
    return sale.update(updateSaleDto);
  }

  async remove(id: number): Promise<void> {
    const sale = await this.findOne(id);
    await sale.destroy();
  }
}
