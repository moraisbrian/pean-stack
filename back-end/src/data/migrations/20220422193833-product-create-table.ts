import { QueryInterface, DataTypes } from 'sequelize';

export = {
    async up(queryInterface: QueryInterface): Promise<void> {
        await queryInterface.createTable('Product', {
            Id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            Description: DataTypes.STRING(100),
			UnitPrice: DataTypes.DOUBLE,
			Amount: DataTypes.INTEGER,
            CreatedAt: DataTypes.DATE,
            UpdatedAt: DataTypes.DATE
        });
    },
    async down(queryInterface: QueryInterface): Promise<void> {
        await queryInterface.dropTable('Product');
    }
}