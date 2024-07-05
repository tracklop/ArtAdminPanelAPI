import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Sale } from '../sales/sale.model';
import { Certificate } from '../certificates/certificate.model';

@Table({
  timestamps: true,
})
export class Client extends Model<Client> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  firstname: string;

  @Column({ type: DataType.STRING, allowNull: false })
  lastname: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  adress: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  complement: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  town: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  postalCode: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: true })
  phone: string;

  @HasMany(() => Sale)
  sales: Sale[];

  @HasMany(() => Certificate)
  certificates: Certificate[];
}
