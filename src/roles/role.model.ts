import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from '../users/user.model';

@Table({
  timestamps: true,
})
export class Role extends Model<Role> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  label: string;

  //   @BelongsToMany(() => User, { through: 'UserRole' })
  @BelongsToMany(() => User, 'UserRoles', 'roleId', 'userId')
  users: User[];
}
