import { Router, Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { ProductController } from '../controllers/productController';

@injectable()
export class ProductRoutes {
	public router: Router = Router();
	private readonly productController: ProductController;

	constructor(productController: ProductController) {
		this.productController = productController;
		this.setRoutes();
	}

	private setRoutes(): void {
		this.router.post('/api/products', async (req: Request, res: Response) => this.productController.add(req, res));
		this.router.get('/api/products', async (req: Request, res: Response) => this.productController.findAll(req, res));
		this.router.get('/api/products/:id', async (req: Request, res: Response) => this.productController.findAllById(req, res));
		this.router.delete('/api/products/:id', async (req: Request, res: Response) => this.productController.delete(req, res));
		this.router.put('/api/products', async (req: Request, res: Response) => this.productController.update(req, res));
	}
}