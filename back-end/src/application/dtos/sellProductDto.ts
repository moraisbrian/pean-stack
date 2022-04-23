export class SellProductDto {
    Id?: string;
    ProductId?: string;
    SellId?: string;
    Amount?: number;
    UnitPrice?: number;
    CreatedAt?: Date;
    UpdatedAt?: Date;

    isValid(): boolean {
        if (!this.ProductId || !this.Amount || !this.UnitPrice) {
            return false;
        }

        return true;
    }
}