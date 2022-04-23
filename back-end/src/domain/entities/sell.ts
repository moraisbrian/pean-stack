import { DataTypes, Optional } from "sequelize";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Product } from "./product";
import { SellProduct } from "./sellProduct";

interface SellAttributes {
    Id: string;
}

interface SellCreationAttributes extends Optional<SellAttributes, 'Id'> {}

@Table({
    tableName: 'Sell'
})
export class Sell extends Model<Sell, SellCreationAttributes> implements SellAttributes {
    @Column({
        type: DataType.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    })
    declare Id: string;

    @BelongsToMany(() => Product, () => SellProduct)
    Products!: Product[];

    @Column
    declare readonly UpdatedAt: Date;

    @Column
    declare readonly CreatedAt: Date;
}