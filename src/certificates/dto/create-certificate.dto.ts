import { IsInt } from 'class-validator';

export class CreateCertificateDto {
  @IsInt()
  readonly painting_id: number;

  @IsInt()
  readonly client_id: number;
}
