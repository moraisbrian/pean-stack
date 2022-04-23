import { QueryInterface, DataTypes } from 'sequelize';

export = {
    async up(queryInterface: QueryInterface): Promise<void> {
        await queryInterface.createTable('Sell', {
            Id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            CreatedAt: DataTypes.DATE,
            UpdatedAt: DataTypes.DATE
        });
    },
    async down(queryInterface: QueryInterface): Promise<void> {
        await queryInterface.dropTable('Sell');
    }
}