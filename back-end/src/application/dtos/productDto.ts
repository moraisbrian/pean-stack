import { SellProductDto } from "./sellProductDto";

export class ProductDto {
    Id?: string;
    Description?: string;
    UnitPrice?: number;
    Amount?: number;
    UpdatedAt?: Date;
    CreatedAt?: Date;
    SellProduct?: SellProductDto[];
}