import { Router } from 'express';
import { injectable } from 'tsyringe';
import { ProductRoutes } from './productRoutes';
import { SellRoutes } from './sellRoutes';

@injectable()
export class Routes {
	public router: Router = Router();
	private readonly productRoutes: ProductRoutes;
	private readonly sellRoutes: SellRoutes;

	constructor(productRoutes: ProductRoutes, sellRoutes: SellRoutes) {
		this.productRoutes = productRoutes;
		this.sellRoutes = sellRoutes;
		this.setRoutes();
	}

	private setRoutes(): void {
		this.router.use(this.productRoutes.router);
		this.router.use(this.sellRoutes.router);
	}
}