import { Optional } from "sequelize";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Sell } from "./sell";
import { SellProduct } from "./sellProduct";

interface ProductAttributes {
    Id: string;
    Description: string;
    UnitPrice: number;
    Amount: number;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'Id'> {}

@Table({
    tableName: 'Product'
})
export class Product extends Model<Product, ProductCreationAttributes> implements ProductAttributes {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        primaryKey: true
    })
    declare Id: string;

    @Column
    declare Description: string;

    @Column
    declare UnitPrice: number;
    
    @Column
    declare Amount: number;

    @BelongsToMany(() => Sell, () => SellProduct)
    Sells!: Sell[];

    @Column
    declare readonly UpdatedAt: Date;

    @Column
    declare readonly CreatedAt: Date;
}