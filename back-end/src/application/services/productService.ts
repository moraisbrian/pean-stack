import { injectable } from "tsyringe";
import { ProductRepository } from "../../data/repositories/productRepository";
import { Product } from "../../domain/entities/product";

@injectable()
export class ProductService {
    private readonly productRepository: ProductRepository;
    constructor (productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async add(product: Product): Promise<Product> {
        return await this.productRepository.add(product);
    }

    async update(product: Product): Promise<number> {
        return await this.productRepository.update(product, product.Id)
    }

    async delete(id: string): Promise<number> {
        return await this.productRepository.delete(id);
    }

    async findAll(): Promise<Product[]> {
        return await this.productRepository.findAll();
    }

    async findById(id: string): Promise<Product> {
        return await this.productRepository.findById(id);
    }
}