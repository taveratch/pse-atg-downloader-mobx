import Sequelize from 'sequelize'

export default (sequelize) => {
    return sequelize.define('siteusers', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        site_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, { underscored: true })
}