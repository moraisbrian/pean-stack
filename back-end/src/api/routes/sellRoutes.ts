import { Router, Request, Response } from "express";
import { injectable } from "tsyringe";
import { SellController } from "../controllers/sellController";
import { verifyJwt } from "../middlewares/verifyJwt";

@injectable()
export class SellRoutes {
    private readonly sellController: SellController;
    public router: Router = Router();

    constructor (sellController: SellController) {
        this.sellController = sellController;
        this.setRoutes();
    }

    private setRoutes(): void {
        this.router.post('/api/sells', verifyJwt, async (req: Request, res: Response) => await this.sellController.sell(req, res));
        this.router.get('/api/sells', verifyJwt, async (req: Request, res: Response) => await this.sellController.findAll(req, res));
    }
}