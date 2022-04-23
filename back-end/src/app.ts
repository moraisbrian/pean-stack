import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { container } from './config/ioc';
import { Server } from './api/server';

dotenv.config();

const server = container.resolve(Server);

const port = process.env.PORT || 3000;
server.app.listen(port, () => console.log(`Server on: http://localhost:${port}`));