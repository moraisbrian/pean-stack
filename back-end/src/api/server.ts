import express, { Application, json, urlencoded, Request, Response, NextFunction } from 'express';
import { injectable } from 'tsyringe';
import { Routes } from './routes/routes';
import { allowCors } from './middlewares/allowCors'

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
		this.app.use(allowCors);
	}

	private setRoutes(): void {
		this.app.use(this.routes.router);
	}
}