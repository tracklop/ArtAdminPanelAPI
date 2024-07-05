import { IsDecimal, IsEnum, IsInt, IsOptional } from 'class-validator';
import { SaleStatus } from '../../common/interfaces/sale-status.enum';

export class UpdateSaleDto {
  @IsInt()
  @IsOptional()
  readonly painting_id?: number;

  @IsInt()
  @IsOptional()
  readonly client_id?: number;

  @IsInt()
  @IsOptional()
  readonly amount?: number;

  @IsEnum(SaleStatus)
  @IsOptional()
  readonly status?: SaleStatus;
}
