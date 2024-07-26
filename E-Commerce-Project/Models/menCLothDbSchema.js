import { Sequelize } from 'sequelize';
import { mysequelize } from '../DbConnectivity/sequelize.js';

const menDbModel = mysequelize.define("menDbModel", {

    product: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
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


menDbModel.sync({ alter: true }).then(() => {
    console.log("Mens DB created");
})

export { menDbModel };