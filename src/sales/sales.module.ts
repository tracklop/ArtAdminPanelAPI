import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { Sale } from './sale.model';
import { Painting } from '../paintings/painting.model';
import { Client } from '../clients/client.model';

@Module({
  imports: [SequelizeModule.forFeature([Sale, Painting, Client])],
  providers: [SalesService],
  controllers: [SalesController],
})
export class SalesModule {}
