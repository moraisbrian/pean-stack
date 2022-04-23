import { injectable } from "tsyringe";
import { SellService } from "../../application/services/sellService";
import { Request, Response } from "express";
import { SellProduct } from "../../domain/entities/sellProduct";

@injectable()
export class SellController {
    private readonly sellService: SellService;
    constructor (sellService: SellService) {
        this.sellService = sellService;
    }

    async sell(req: Request, res: Response): Promise<void> {
        try {
            const sellProducts = req.body.sellProducts;
            const products: SellProduct[] = [];

            for (let i = 0; i < sellProducts.length; i++) {
                if (!sellProducts[i].amount || !sellProducts[i].unitPrice || !sellProducts[i].productId) {
                    throw new Error('Dados inválidos');
                }

                const product = new SellProduct();
                product.Amount = sellProducts[i].amount;
                product.UnitPrice = sellProducts[i].unitPrice;
                product.ProductId = sellProducts[i].productId;

                products.push(product);
            }

            const inserted = await this.sellService.sell(products);
            res.status(200).json(inserted)
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    }

    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const sells = await this.sellService.findAll();
            res.status(200).json(sells);
        } catch (error) {
            res.status(400).json(error);
        }
    }
}