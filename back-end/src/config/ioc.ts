import { Sequelize } from 'sequelize-typescript';
import { container } from 'tsyringe'
import { sequelize } from '../domain/entities'

container.register<Sequelize>("Sequelize", { useValue: sequelize });

export { container };