import { ProductService } from "../../application/services/productService";
import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { Product } from "../../domain/entities/product";

@injectable()
export class ProductController {
    private productService: ProductService;
    constructor (productService: ProductService) {
        this.productService = productService;
    }

    async add(req: Request, res: Response): Promise<void> {
        try {
            if (!req.body.description || !req.body.amount || !req.body.unitPrice) {
                throw new Error('Dados do produto inválidos');
            }

            const product = new Product();
            product.Description = req.body.description;
            product.UnitPrice = req.body.unitPrice;
            product.Amount = req.body.amount;

            const inserted = await this.productService.add(product);
            res.status(201).json(inserted);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const products = await this.productService.findAll();
            res.status(200).json(products);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async findAllById(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const product = await this.productService.findById(id);
            res.status(200).json(product);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            if (!req.params.id) {
                throw new Error('Id inválido');
            }

            const id = req.params.id;
            const rowsAffected = await this.productService.delete(id);
            res.status(200).json(rowsAffected);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            if (!req.body.id || !req.body.description || !req.body.amount || !req.body.unitPrice) {
                throw new Error('Dados do produto inválidos');
            }

            const product = new Product();
            product.Id = req.body.id;
            product.Description = req.body.description;
            product.UnitPrice = req.body.unitPrice;
            product.Amount = req.body.amount;

            const updated = await this.productService.update(product);
            res.status(200).json(updated);
        } catch (error) {
            res.status(400).json(error);
        }
    }
}