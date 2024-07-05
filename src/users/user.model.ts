import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Role } from '../roles/role.model';

@Table({
  timestamps: true,
})
export class User extends Model<User> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  lastname: string;

  @Column({ type: DataType.STRING, allowNull: false })
  firstname: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  refreshToken: string;

  //   @BelongsToMany(() => Role, { through: 'UserRole' })
  @BelongsToMany(() => Role, 'UserRoles', 'userId', 'roleId')
  roles: Role[];
}
