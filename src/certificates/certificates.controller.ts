import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/interfaces/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @Post()
  // @Roles(Role.Admin)
  async create(@Body() createCertificateDto: CreateCertificateDto) {
    return this.certificatesService.create(createCertificateDto);
  }

  @Get()
  // @Roles(Role.Admin)
  async findAll() {
    return this.certificatesService.findAll();
  }

  @Get(':id')
  // @Roles(Role.Admin)
  async findOne(@Param('id') id: string) {
    return this.certificatesService.findOne(+id);
  }

  @Delete(':id')
  // @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    return this.certificatesService.remove(+id);
  }
}
