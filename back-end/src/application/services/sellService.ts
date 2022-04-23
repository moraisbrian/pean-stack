import { injectable } from "tsyringe";
import { SellRepository } from "../../data/repositories/sellRepository";
import { SellProduct } from "../../domain/entities/sellProduct";
import { SellProductDto } from "../dtos/sellProductDto";

@injectable()
export class SellService {
    private readonly sellRepository: SellRepository;
    constructor (sellRepository: SellRepository) {
        this.sellRepository = sellRepository;
    }

    async add(productsDto: SellProductDto[]): Promise<string | unknown> {
        const products: SellProduct[] = [];
        for (let i = 0; i < productsDto.length; i++) {
            if (!productsDto[i].isValid()) {
                throw new Error('Dados inválidos');
            }

            const product = new SellProduct();
            product.ProductId = productsDto[i].ProductId!;
            product.Amount = productsDto[i].Amount!;
            product.UnitPrice = productsDto[i].UnitPrice!;

            products.push(product);
        }

        return await this.sellRepository.add(products);
    }
}