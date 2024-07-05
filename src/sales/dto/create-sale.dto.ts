import { IsDecimal, IsEnum, IsInt } from 'class-validator';
import { SaleStatus } from '../../common/interfaces/sale-status.enum';

export class CreateSaleDto {
  @IsInt()
  readonly painting_id: number;

  @IsInt()
  readonly client_id: number;

  @IsInt()
  readonly amount: number;

  @IsEnum(SaleStatus)
  readonly status: SaleStatus;
}
