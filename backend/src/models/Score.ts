import {
    Table,
    Column,
    Model,
    DataType,
    Default,
    BelongsTo,
} from "sequelize-typescript";
import { User } from "./User";

@Table
export class Score extends Model {
    @BelongsTo(() => User)
    user!: User;

    @Column(DataType.INTEGER)
    @Default(0)
    pvp_L!: number;

    @Column(DataType.INTEGER)
    @Default(0)
    pvp_W!: number;

    @Column(DataType.INTEGER)
    @Default(0)
    bot_L!: number;

    @Column(DataType.INTEGER)
    @Default(0)
    bot_W!: number;
}
