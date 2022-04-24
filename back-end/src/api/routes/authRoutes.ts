import { Router, Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { AuthController } from '../controllers/authController';
import { verifyJwt } from '../middlewares/verifyJwt';

@injectable()
export class AuthRoutes {
	public router: Router = Router();
	private readonly authController: AuthController;

	constructor(authController: AuthController) {
		this.authController = authController;
		this.setRoutes();
	}

	private setRoutes(): void {
		this.router.post('/api/auth', async (req: Request, res: Response) => await this.authController.authenticate(req, res));
		this.router.post('/api/users', verifyJwt, async (req: Request, res: Response) => await this.authController.add(req, res));
	}
}