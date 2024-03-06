import {
    Table,
    Column,
    Model,
    DataType,
    Index,
    HasOne,
} from "sequelize-typescript";
import { Score } from "./Score";

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

    @HasOne(() => Score)
    score!: Score;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true,
    })
    isActive: boolean = true;
}
