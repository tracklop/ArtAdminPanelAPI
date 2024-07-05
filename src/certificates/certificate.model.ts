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

@Table({
  timestamps: true,
})
export class Certificate extends Model<Certificate> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Painting)
  @Column({ type: DataType.INTEGER, allowNull: false })
  painting_id: number;

  @ForeignKey(() => Client)
  @Column({ type: DataType.INTEGER, allowNull: false })
  client_id: number;

  @Column({ type: DataType.STRING, allowNull: true })
  pdfUrl: string;

  @Column({ type: DataType.STRING, allowNull: true })
  pdfFilename: string;

  @BelongsTo(() => Painting)
  painting: Painting;

  @BelongsTo(() => Client)
  client: Client;
}
