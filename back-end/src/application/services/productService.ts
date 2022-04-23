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
        if (!productDto.Description || !productDto.Amount || !productDto.UnitPrice) {
            throw new Error('Dados do produto inválidos');
        }

        const product = new Product();
        product.Description = productDto.Description;
        product.Amount = productDto.Amount;
        product.UnitPrice = productDto.UnitPrice;

        const inserted = await this.productRepository.add(product);

        productDto.CreatedAt = inserted.CreatedAt;
        productDto.UpdatedAt = inserted.UpdatedAt;
        productDto.Id = inserted.Id;

        return productDto;
    }

    async update(productDto: ProductDto): Promise<number> {
        if (!productDto.Id || !productDto.Description || !productDto.Amount || !productDto.UnitPrice) {
            throw new Error('Dados do produto inválidos');
        }

        const product = new Product();
        product.Description = productDto.Description;
        product.Amount = productDto.Amount;
        product.UnitPrice = productDto.UnitPrice;

        return await this.productRepository.update(product, productDto.Id)
    }

    async delete(id: string): Promise<number> {
        if (!id) {
            throw new Error('Id inválido');
        }

        return await this.productRepository.delete(id);
    }

    async findAll(): Promise<ProductDto[]> {
        const products = await this.productRepository.findAll();

        const productsDto: ProductDto[] = [];

        for (let i = 0; i < products.length; i++) {
            const productDto = new ProductDto();
            productDto.Id = products[i].Id;
            productDto.Description = products[i].Description;
            productDto.UnitPrice = products[i].UnitPrice;
            productDto.Amount = products[i].Amount;
            productDto.CreatedAt = products[i].CreatedAt;
            productDto.UpdatedAt = products[i].UpdatedAt;

            productsDto.push(productDto);
        }

        return productsDto;
    }

    async findById(id: string): Promise<ProductDto> {
        const product = await this.productRepository.findById(id);

        const productDto = new ProductDto();
        productDto.Id = product.Id;
        productDto.Description = product.Description;
        productDto.UnitPrice = product.UnitPrice;
        productDto.Amount = product.Amount;
        productDto.CreatedAt = product.CreatedAt;
        productDto.UpdatedAt = product.UpdatedAt;

        return productDto;
    }
}