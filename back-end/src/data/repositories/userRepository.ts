import { Sequelize } from "sequelize-typescript";
import { inject, injectable } from "tsyringe";
import { User } from "../../domain/entities/user";

@injectable()
export class UserRepository {
    private readonly sequelize: Sequelize;
    constructor (@inject('Sequelize') sequelize: Sequelize) {
        this.sequelize = sequelize;
    }

    async add(user: User): Promise<User> {
        return await this.sequelize.models.User.create({
            Name: user.Name,
            Email: user.Email,
            Password: user.Password
        }) as User;
    }

    async findByEmailAndPassword(email: string, password: string): Promise<User> {
        return await this.sequelize.models.User.findOne({
            where: {
                Email: email,
                Password: password
            }
        }) as User;
    }
}