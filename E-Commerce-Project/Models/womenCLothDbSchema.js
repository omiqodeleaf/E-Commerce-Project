import { Sequelize } from 'sequelize';
import { mysequelize } from '../DbConnectivity/sequelize.js';

const womenDbModel = mysequelize.define("womenDbModel", {

    product: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DataTypes.INTEGER
    },
    category: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    createdAt: { type: Sequelize.DataTypes.DATE, allowNull: true, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    updatedAt: { type: Sequelize.DataTypes.DATE, allowNull: true, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }

});


womenDbModel.sync({ alter: true }).then(() => {
    console.log("Womens DB created");
})

export { womenDbModel };