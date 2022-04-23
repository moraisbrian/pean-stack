import { QueryInterface, DataTypes } from 'sequelize';

export = {
    async up(queryInterface: QueryInterface): Promise<void> {
        await queryInterface.createTable('SellProduct', {
            Id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            ProductId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'Product',
                    key: 'Id'
                }
            },
            SellId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'Sell',
                    key: 'Id'
                }
            },
            Amount: DataTypes.INTEGER,
            UnitPrice: DataTypes.DOUBLE,
            CreatedAt: DataTypes.DATE,
            UpdatedAt: DataTypes.DATE
        });
    },
    async down(queryInterface: QueryInterface): Promise<void> {
        await queryInterface.dropTable('SellProduct');
    }
}