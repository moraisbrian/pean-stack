import { Request, Response } from 'express';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { injectable } from 'tsyringe';
import { UserDto } from '../../application/dtos/userDto';
import { UserService } from '../../application/services/userService';

@injectable()
export class AuthController {
    private readonly userService: UserService;
    constructor(userService: UserService) {
        this.userService = userService;
    }

    async authenticate(req: Request, res: Response): Promise<void> {
        try {
            if (!req.body.Email || !req.body.Password) {
                res.status(400).send('Dados inválidos');
            } else {
                const encriptedPassword = this.encriptPassword(req.body.Password);

                const user = await this.userService.findByEmailAndPassword(req.body.Email, encriptedPassword);

                if (user) {
                    const token = jwt.sign({
                        Id: user.Id,
                        Name: user.Name,
                        Email: user.Email,
                        CreatedAt: user.CreatedAt,
                        UpdatedAt: user.UpdatedAt
                    }, process.env.JWT_SECRET!, {
                        expiresIn: process.env.JWT_EXPIRES_IN
                    });

                    res.status(200).json(token);
                } else {
                    res.status(401).json('Login inválido!');
                }
            }
        } catch (error) {
            res.status(500).json('Erro ao autenticar');
        }
    }

    async add(req: Request, res: Response): Promise<void> {
        try {
            if (!req.body.Email || !req.body.Password || !req.body.Name) {
                throw 'Dados inválidos';
            }

            const user = new UserDto();
            user.Name = req.body.Name;
            user.Email = req.body.Email;
            user.Password = this.encriptPassword(req.body.Password);

            const inserted = await this.userService.add(user);

            res.status(201).json(inserted);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    private encriptPassword(password: string): string {
        return crypto.createHash('sha256').update(password).digest('hex');
    }
}