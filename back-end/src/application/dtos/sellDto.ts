import { ProductDto } from "./productDto";

export class SellDto {
    Id?: string;
    UpdatedAt?: Date;
    CreatedAt?: Date;
    Products?: ProductDto[];
}