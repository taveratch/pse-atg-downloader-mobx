import Sequelize from 'sequelize'

export default (sequelize) => {
    return sequelize.define('sites', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            required: true
        },
        url: {
            type: Sequelize.STRING,
            required: true
        },
        port: {
            type: Sequelize.INTEGER,
            required: true
        }
    }, { underscored: true })
}