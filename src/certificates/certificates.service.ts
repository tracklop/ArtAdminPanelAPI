import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Certificate } from './certificate.model';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { Painting } from '../paintings/painting.model';
import { Client } from '../clients/client.model';
import { Sale } from '../sales/sale.model';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CertificatesService {
  constructor(
    @InjectModel(Certificate)
    private readonly certificateModel: typeof Certificate,
    @InjectModel(Painting)
    private readonly paintingModel: typeof Painting,
    @InjectModel(Client)
    private readonly clientModel: typeof Client,
    @InjectModel(Sale)
    private readonly saleModel: typeof Sale,
  ) {}

  async create(
    createCertificateDto: CreateCertificateDto,
  ): Promise<Certificate> {
    const { painting_id, client_id } = createCertificateDto;
    const painting = await this.paintingModel.findByPk(painting_id);
    const client = await this.clientModel.findByPk(client_id);
    const sale = await this.saleModel.findOne({
      where: { painting_id, client_id },
    });

    if (!painting || !client || !sale) {
      throw new NotFoundException('Painting, Client or Sale not found');
    }

    const pdfFilename = `certificate_${painting_id}_${client_id}.pdf`;
    const pdfPath = path.join('./uploads', pdfFilename);
    this.generatePdf(painting, client, sale, pdfPath);

    const pdfUrl = `/uploads/${pdfFilename}`;
    const certificate = await this.certificateModel.create({
      painting_id,
      client_id,
      pdfUrl,
      pdfFilename,
    });

    return certificate;
  }

  async findAll(): Promise<Certificate[]> {
    return this.certificateModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Certificate> {
    const certificate = await this.certificateModel.findOne({
      where: { id },
      include: { all: true },
    });
    if (!certificate) {
      throw new NotFoundException(`Certificate with ID ${id} not found`);
    }
    return certificate;
  }

  async remove(id: number): Promise<void> {
    const certificate = await this.findOne(id);
    if (certificate.pdfFilename) {
      const filePath = path.join('./uploads', certificate.pdfFilename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    await certificate.destroy();
  }

  private generatePdf(
    painting: Painting,
    client: Client,
    sale: Sale,
    pdfPath: string,
  ) {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pdfPath));

    doc.fontSize(20).text('Certificate of Authenticity', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Painting: ${painting.title}`);
    doc.text(`Description: ${painting.description}`);
    doc.text(`Dimensions: ${painting.width} x ${painting.height}`);
    doc.text(`Price: ${painting.prize}`);
    doc.moveDown();
    doc.text(`Client: ${client.firstname} ${client.lastname}`);
    doc.text(`Email: ${client.email}`);
    doc.moveDown();
    doc.text(`Sale Date: ${sale.createdAt}`);
    doc.moveDown();
    doc.text('This certificate verifies the authenticity of the painting.', {
      align: 'center',
    });
    doc.moveDown();
    doc.text('Signature: ______________________', { align: 'right' });

    doc.end();
  }
}
