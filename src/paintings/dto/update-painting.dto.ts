import { Quantity } from 'src/common/interfaces/quantity.enum';

export class UpdatePaintingDto {
  readonly title?: string;
  readonly description?: string;
  readonly width?: number;
  readonly height?: number;
  readonly prize?: number;
  readonly quantity?: Quantity;
  readonly imageUrl?: string;
}
