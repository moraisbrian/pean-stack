import { Sequelize } from "sequelize-typescript";
import { inject, injectable } from "tsyringe";
import { Product } from "../../domain/entities/product";
import { Sell } from "../../domain/entities/sell";
import { SellProduct } from "../../domain/entities/sellProduct";

@injectable()
export class SellRepository {
    private readonly sequelize: Sequelize;

    constructor (@inject('Sequelize') sequelize: Sequelize) {
        this.sequelize = sequelize;
    }

    async findAll(): Promise<Sell[]> {
        return await this.sequelize.models.Sell.findAll({ include: Product }) as Sell[];
    }

    async sell(products: SellProduct[]): Promise<string | unknown> {
        const transaction = await this.sequelize.transaction();

        try {
            const sell = await this.sequelize.models.Sell.create({}, { transaction }) as Sell;

            for (let i = 0; i < products.length; i++) {
                await this.sequelize.models.SellProduct.create({
                    ProductId: products[i].ProductId,
                    SellId: sell.Id,
                    Amount: products[i].Amount,
                    UnitPrice: products[i].UnitPrice
                }, {
                    transaction
                });

                const storedProduct = await this.sequelize.models.Product.findByPk(products[i].ProductId, { transaction }) as Product;
                const amountUpdated = storedProduct.Amount - products[i].Amount;

                await this.sequelize.models.Product.update({
                    Amount: amountUpdated
                }, {
                    transaction,
                    where: {
                        Id: storedProduct.Id
                    }
                });
            }

            transaction.commit();

            return sell.Id;
        } catch (error) {  
            transaction.rollback();
            return error;
        }
    }
}