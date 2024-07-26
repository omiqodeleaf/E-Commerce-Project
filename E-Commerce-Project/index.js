import express from 'express';
import { dbstatus } from './DbConnectivity/sequelize.js';
import router from './Router/routes.js';
import bodyParser from 'body-parser';
import cookie from 'cookie-parser';
import dotenv from 'dotenv'
import retailerRouter from './Router/retailerRoutes.js';
dotenv.config()
const app = express();
app.use(bodyParser.json());
app.use(cookie())
dbstatus();

app.use('/user', router);
app.use('/retailer', retailerRouter);

app.listen(8080, () => {
    console.log("Server is up and running");
})

