import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CertificatesService } from './certificates.service';
import { CertificatesController } from './certificates.controller';
import { Certificate } from './certificate.model';
import { Painting } from '../paintings/painting.model';
import { Client } from '../clients/client.model';
import { Sale } from '../sales/sale.model';

@Module({
  imports: [SequelizeModule.forFeature([Certificate, Painting, Client, Sale])],
  providers: [CertificatesService],
  controllers: [CertificatesController],
})
export class CertificatesModule {}
