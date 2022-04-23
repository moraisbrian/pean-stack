import { Sequelize } from 'sequelize-typescript';
import { Options } from 'sequelize';
import config from '../../data/config';

import { SellProduct } from './sellProduct';
import { Sell } from './sell';
import { Product } from './product';

const sequelize = new Sequelize(<Options>config);
sequelize.addModels([
    SellProduct,
    Sell,
    Product
]);

export { sequelize };