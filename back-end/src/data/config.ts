import * as dotenv from 'dotenv';

dotenv.config();

export = {
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  host: process.env.HOST,
  dialect: 'postgres',
  define: {
    timestamps: true,
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt'
  }
}