import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Painting } from '../paintings/painting.model';
import { Client } from '../clients/client.model';
import { SaleStatus } from '../common/interfaces/sale-status.enum';

@Table({
  timestamps: true,
})
export class Sale extends Model<Sale> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Painting)
  @Column({ type: DataType.INTEGER, allowNull: false })
  painting_id: number;

  @ForeignKey(() => Client)
  @Column({ type: DataType.INTEGER, allowNull: false })
  client_id: number;

  @Column({ type: DataType.DECIMAL, allowNull: false })
  amount: number;

  @Column({
    type: DataType.ENUM,
    values: Object.values(SaleStatus),
    allowNull: false,
  })
  status: SaleStatus;

  @BelongsTo(() => Painting)
  painting: Painting;

  @BelongsTo(() => Client)
  client: Client;
}
