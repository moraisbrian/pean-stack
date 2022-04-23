import { Sequelize } from "sequelize-typescript";
import { inject, injectable } from "tsyringe";
import { Product } from "../../domain/entities/product";

@injectable()
export class ProductRepository {
    private readonly sequelize: Sequelize;
    constructor (@inject('Sequelize') sequelize: Sequelize) {
        this.sequelize = sequelize;
    }

    async add(product: Product): Promise<Product> {
        return await this.sequelize.models.Product.create({
            Description: product.Description,
            UnitPrice: product.UnitPrice,
            Amount: product.Amount
        }) as Product;
    }

    async update(product: Product, productId: string): Promise<number> {
        const inserted = await this.sequelize.models.Product.update({
            Description: product.Description,
            UnitPrice: product.UnitPrice,
            Amount: product.Amount
        }, {
            where: {
                Id: productId
            }
        });

        return inserted[0];
    }

    async findAll(): Promise<Product[]> {
        return await this.sequelize.models.Product.findAll() as Product[];
    }

    async findById(id: string): Promise<Product> {
        return await this.sequelize.models.Product.findByPk(id) as Product;
    }

    async delete(id: string): Promise<number> {
        return await this.sequelize.models.Product.destroy({ where: { Id: id }});
    }
}