import { DataTypes, Optional } from "sequelize";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "./product";
import { Sell } from "./sell";

interface SellProductsAttribute {
    Id: string;
    ProductId: string;
    SellId: string;
    Amount: number;
    UnitPrice: number;
}

interface SellProductCreationAttributes extends Optional<SellProductsAttribute, 'Id'> {}

@Table({
    tableName: 'SellProduct'
})
export class SellProduct extends Model<SellProduct, SellProductCreationAttributes> implements SellProductsAttribute {
    @Column({
        type: DataType.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    })
    declare Id: string;

    @Column
    @ForeignKey(() => Product)
    declare ProductId: string;

    @Column
    @ForeignKey(() => Sell)
    declare SellId: string;

    @Column
    declare Amount: number;

    @Column
    declare UnitPrice: number;

    @Column
    declare readonly UpdatedAt: Date;

    @Column
    declare readonly CreatedAt: Date;
}