import express, { Application, json, urlencoded, Request, Response, NextFunction } from 'express';
import { injectable } from 'tsyringe';
import { Routes } from './routes/routes';

@injectable()
export class Server {
	public app: Application = express();
	private routes: Routes;

	constructor(routes: Routes) {
		this.routes = routes;
		this.setMiddlewares();
		this.setRoutes();
	}

	private setMiddlewares(): void {
		this.app.use(json());
		this.app.use(urlencoded({ extended: false }));

		this.app.use((req: Request, res: Response, next: NextFunction) => {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
			res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept');
			next();
		});
	}

	private setRoutes(): void {
		this.app.use(this.routes.router);
	}
}