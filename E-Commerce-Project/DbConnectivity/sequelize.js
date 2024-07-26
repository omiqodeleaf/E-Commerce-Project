import { Sequelize } from "sequelize";

const mysequelize = new Sequelize('test', 'postgres', '30november2001', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
});

const dbstatus = async () => {
    try {
        await mysequelize.authenticate();
        console.log('Connection has been established successfully for db Status');

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export { mysequelize, dbstatus }

