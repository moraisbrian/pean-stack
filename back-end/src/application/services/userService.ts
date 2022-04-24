import { injectable } from "tsyringe";
import { UserRepository } from "../../data/repositories/userRepository";
import { User } from "../../domain/entities/user";
import { UserDto } from "../dtos/userDto";

@injectable()
export class UserService {
    private readonly userRepository: UserRepository;
    constructor (userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async add(userDto: UserDto): Promise<UserDto> {
        const user = new User();
        user.Name = userDto.Name!;
        user.Email = userDto.Email!;
        user.Password = userDto.Password!;

        const inserted = await this.userRepository.add(user);

        userDto.Id = inserted.Id;
        userDto.CreatedAt = inserted.CreatedAt;
        userDto.UpdatedAt = inserted.UpdatedAt;

        return userDto;
    }

    async findByEmailAndPassword(email: string, password: string): Promise<UserDto> {
        return this.userRepository.findByEmailAndPassword(email, password);
    }
}