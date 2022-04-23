import { injectable } from "tsyringe";
import { SellRepository } from "../../data/repositories/sellRepository";
import { Sell } from "../../domain/entities/sell";
import { SellProduct } from "../../domain/entities/sellProduct";

@injectable()
export class SellService {
    private readonly sellRepository: SellRepository;
    constructor (sellRepository: SellRepository) {
        this.sellRepository = sellRepository;
    }

    async sell(products: SellProduct[]): Promise<string | unknown> {
        return await this.sellRepository.sell(products);
    }

    async findAll(): Promise<Sell[]> {
        return await this.sellRepository.findAll();
    }
}