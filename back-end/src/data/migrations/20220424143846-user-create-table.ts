import { QueryInterface, DataTypes } from 'sequelize';

export = {
    async up(queryInterface: QueryInterface): Promise<void> {
        await queryInterface.createTable('User', {
            Id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            Name: DataTypes.STRING(100),
            Email: DataTypes.STRING(100),
            Password: DataTypes.STRING(64),
            CreatedAt: DataTypes.DATE,
            UpdatedAt: DataTypes.DATE
        });
    },
    async down(queryInterface: QueryInterface): Promise<void> {
        await queryInterface.dropTable('User');
    }
}