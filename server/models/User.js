import Sequelize from 'sequelize'

export default (sequelize) => {
    return sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            },
            required: true
        },
        password: {
            type: Sequelize.STRING,
            required: true
        },
        is_admin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, { underscored: true })
}