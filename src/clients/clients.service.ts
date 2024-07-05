import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from './client.model';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client)
    private readonly clientModel: typeof Client,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    return this.clientModel.create(createClientDto);
  }

  async findAll(): Promise<Client[]> {
    return this.clientModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientModel.findOne({
      where: { id },
      include: { all: true },
    });
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id);
    return client.update(updateClientDto);
  }

  async remove(id: number): Promise<void> {
    const client = await this.findOne(id);
    await client.destroy();
  }
}
