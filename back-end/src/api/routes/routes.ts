import { Router } from 'express';
import { injectable } from 'tsyringe';
import { AuthRoutes } from './authRoutes';
import { ProductRoutes } from './productRoutes';
import { SellRoutes } from './sellRoutes';

@injectable()
export class Routes {
	public router: Router = Router();
	private readonly productRoutes: ProductRoutes;
	private readonly sellRoutes: SellRoutes;
	private readonly authRoutes: AuthRoutes;

	constructor(productRoutes: ProductRoutes, sellRoutes: SellRoutes, authRoutes: AuthRoutes) {
		this.productRoutes = productRoutes;
		this.sellRoutes = sellRoutes;
		this.authRoutes = authRoutes;
		this.setRoutes();
	}

	private setRoutes(): void {
		this.router.use(this.productRoutes.router);
		this.router.use(this.sellRoutes.router);
		this.router.use(this.authRoutes.router);
	}
}