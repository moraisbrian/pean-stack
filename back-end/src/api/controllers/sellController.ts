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

    async add(req: Request, res: Response): Promise<void> {
        try {
            const sellProducts = req.body.sellProducts;
            const products: SellProductDto[] = [];

            for (let i = 0; i < sellProducts.length; i++) {
                const toAdd = new SellProductDto();
                toAdd.Amount = sellProducts[i].amount;
                toAdd.UnitPrice = sellProducts[i].unitPrice;
                toAdd.ProductId = sellProducts[i].productId;

                products.push(toAdd);
            }

            const inserted = await this.sellService.add(products);
            res.status(200).json(inserted)
        } catch (error) {
            res.status(400).json(error);
        }
    }
}