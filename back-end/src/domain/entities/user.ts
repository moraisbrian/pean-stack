import { DataTypes, Optional } from "sequelize";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserAttributes {
    Id: string;
    Name: string;
    Email: string;
    Password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'Id'> {}

@Table({
    tableName: 'User'
})
export class User extends Model<User, UserCreationAttributes> implements UserAttributes {
    @Column({
        type: DataType.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    })
    declare Id: string;

    @Column
    declare Name: string;

    @Column
    declare Email: string;

    @Column 
    declare Password: string;

    @Column
    declare readonly UpdatedAt: Date;

    @Column
    declare readonly CreatedAt: Date;
}