import { IsDecimal, IsEnum, IsInt } from 'class-validator';
import { SaleStatus } from '../../common/interfaces/sale-status.enum';

export class CreateSaleDto {
  @IsInt()
  readonly paintingId: number;

  @IsInt()
  readonly clientId: number;

  @IsDecimal()
  readonly amount: number;

  @IsEnum(SaleStatus)
  readonly status: SaleStatus;
}
