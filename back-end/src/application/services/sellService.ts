import { injectable } from "tsyringe";
import { SellRepository } from "../../data/repositories/sellRepository";
import { SellProduct } from "../../domain/entities/sellProduct";
import { SellDto } from "../dtos/sellDto";
import { SellProductDto } from "../dtos/sellProductDto";

@injectable()
export class SellService {
    private readonly sellRepository: SellRepository;
    constructor (sellRepository: SellRepository) {
        this.sellRepository = sellRepository;
    }

    async sell(products: SellProductDto[]): Promise<string | unknown> {
        const sellProducts: SellProduct[] = [];
        for (let i = 0; i < products.length; i++) {

            const sellProduct = new SellProduct();
            sellProduct.Amount = products[i].Amount!;
            sellProduct.UnitPrice = products[i].UnitPrice!;
            sellProduct.ProductId = products[i].ProductId!;

            sellProducts.push(sellProduct);
        }

        return await this.sellRepository.sell(sellProducts);
    }

    async findAll(): Promise<SellDto[]> {
        return await this.sellRepository.findAll();
    }
}