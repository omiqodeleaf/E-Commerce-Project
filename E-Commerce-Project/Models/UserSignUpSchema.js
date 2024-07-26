import { Sequelize } from 'sequelize';
import { mysequelize } from '../DbConnectivity/sequelize.js';

const signUpModel = mysequelize.define("userSignUpInfo",
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
        email: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
            primaryKey: true
        },
        createdAt: { type: Sequelize.DataTypes.DATE, allowNull: true, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
        updatedAt: { type: Sequelize.DataTypes.DATE, allowNull: true, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    }
);


signUpModel.sync({ alter: true }).then(() => {
    console.log("signUp Table created");
})

export { signUpModel };