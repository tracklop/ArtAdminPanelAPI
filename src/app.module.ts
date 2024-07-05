import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { PaintingsModule } from './paintings/paintings.module';
import { ClientsModule } from './clients/clients.module';
import { SalesModule } from './sales/sales.module';
import { CertificatesModule } from './certificates/certificates.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    PaintingsModule,
    ClientsModule,
    SalesModule,
    CertificatesModule,
    UsersModule,
    RolesModule,
    AuthModule,
    UploadModule,
  ],
})
export class AppModule {}
