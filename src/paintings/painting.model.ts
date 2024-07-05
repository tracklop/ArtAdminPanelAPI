import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { Sale } from '../sales/sale.model';
import { Certificate } from '../certificates/certificate.model';
import { Quantity } from '../common/interfaces/quantity.enum';

@Table({
  timestamps: true,
})
export class Painting extends Model<Painting> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  width: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  height: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  prize: number;

  @Column({
    type: DataType.ENUM,
    values: Object.values(Quantity),
    allowNull: false,
  })
  quantity: Quantity;

  @Column({ type: DataType.STRING, allowNull: true, unique: true })
  imageUrl: string;

  @Column({ type: DataType.STRING, allowNull: true, unique: true })
  imageFilename: string;

  @HasOne(() => Sale)
  sales: Sale;

  @HasOne(() => Certificate)
  certificats: Certificate;
}
