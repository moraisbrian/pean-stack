import { injectable } from "tsyringe";
import { ProductRepository } from "../../data/repositories/productRepository";
import { Product } from "../../domain/entities/product";
import { ProductDto } from "../dtos/productDto";

@injectable()
export class ProductService {
    private readonly productRepository: ProductRepository;
    constructor (productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async add(productDto: ProductDto): Promise<ProductDto> {
        const product = new Product();
        product.Description = productDto.Description!;
        product.UnitPrice = productDto.UnitPrice!;
        product.Amount = productDto.Amount!;

        const inserted = await this.productRepository.add(product);

        productDto.CreatedAt = inserted.CreatedAt;
        productDto.UpdatedAt = inserted.UpdatedAt;
        productDto.Id = inserted.Id;

        return productDto;
    }

    async update(productDto: ProductDto): Promise<number> {
        const product = new Product();
        product.Description = productDto.Description!;
        product.UnitPrice = productDto.UnitPrice!;
        product.Amount = productDto.Amount!;

        return await this.productRepository.update(product, productDto.Id!)
    }

    async delete(id: string): Promise<number> {
        return await this.productRepository.delete(id);
    }

    async findAll(): Promise<ProductDto[]> {
        return await this.productRepository.findAll();
    }

    async findById(id: string): Promise<ProductDto> {
        return await this.productRepository.findById(id);
    }
}