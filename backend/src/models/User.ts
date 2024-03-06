import {
  Table,
  Column,
  Model,
  DataType,
  Index,
  AllowNull,
  Default,
} from "sequelize-typescript";

@Table
export class User extends Model {
  @Index({
    name: "username-index",
    unique: true,
    where: { isActive: true },
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [4, 16],
    },
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  })
  email!: string;

  @Column({
    type: DataType.STRING(60),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  password!: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive: boolean = true;

  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER)
  pvp_L!: number;

  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER)
  pvp_W!: number;

  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER)
  bot_L!: number;

  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER)
  bot_W!: number;
}
