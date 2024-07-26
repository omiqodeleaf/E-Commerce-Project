import { Sequelize } from 'sequelize';
import { mysequelize } from '../DbConnectivity/sequelize.js';

const retailerModel = mysequelize.define("retailerInfo",
    {
        firstname: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: Sequelize.DataTypes.STRING,
        },
        userpassword: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        shopname: {
            type: Sequelize.DataTypes.STRING,
        },
        email: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
            primaryKey: true
        },
        createdAt: { type: Sequelize.DataTypes.DATE, allowNull: true, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
        updatedAt: { type: Sequelize.DataTypes.DATE, allowNull: true, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    }
);


retailerModel.sync({ alter: true }).then(() => {
    console.log("Retailer Table created");
})

export { retailerModel };