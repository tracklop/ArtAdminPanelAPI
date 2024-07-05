export class CreateClientDto {
  readonly firstname: string;
  readonly lastname: string;
  readonly address?: string;
  readonly complement?: string;
  readonly town?: string;
  readonly postalCode?: string;
  readonly email: string;
  readonly phone?: string;
}
