import { IsDecimal, IsEnum, IsInt, IsOptional } from 'class-validator';
import { SaleStatus } from '../../common/interfaces/sale-status.enum';

export class UpdateSaleDto {
  @IsInt()
  @IsOptional()
  readonly paintingId?: number;

  @IsInt()
  @IsOptional()
  readonly clientId?: number;

  @IsDecimal()
  @IsOptional()
  readonly amount?: number;

  @IsEnum(SaleStatus)
  @IsOptional()
  readonly status?: SaleStatus;
}
