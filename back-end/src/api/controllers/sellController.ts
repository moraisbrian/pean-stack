import { injectable } from "tsyringe";
import { SellService } from "../../application/services/sellService";
import { Request, Response } from "express";
import { SellProductDto } from "../../application/dtos/sellProductDto";

@injectable()
export class SellController {
    private readonly sellService: SellService;
    constructor (sellService: SellService) {
        this.sellService = sellService;
    }

    async sell(req: Request, res: Response): Promise<void> {
        try {
            const sellProducts = req.body.SellProducts;
            const products: SellProductDto[] = [];

            for (let i = 0; i < sellProducts.length; i++) {
                if (!sellProducts[i].Amount || !sellProducts[i].UnitPrice || !sellProducts[i].ProductId) {
                    throw 'Dados inválidos';
                }

                const product = new SellProductDto();
                product.Amount = sellProducts[i].Amount;
                product.UnitPrice = sellProducts[i].UnitPrice;
                product.ProductId = sellProducts[i].ProductId;

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