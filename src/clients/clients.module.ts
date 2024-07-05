import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { Client } from './client.model';

@Module({
  imports: [SequelizeModule.forFeature([Client])],
  providers: [ClientsService],
  controllers: [ClientsController],
})
export class ClientsModule {}
