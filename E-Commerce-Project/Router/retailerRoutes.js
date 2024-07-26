import express from 'express';
import { authenticateRetailer } from '../Middleware/middleware.js';
import { menDbModel } from '../Models/menCLothDbSchema.js';
import jwt from 'jsonwebtoken';
import { retailerModel } from '../Models/RetailerSignUpSchema.js';
import { womenDbModel } from '../Models/womenCLothDbSchema.js';

const retailerRouter = express.Router();


retailerRouter.post('/retailsignup', authenticateRetailer, (req, res) => {

    try {
        let firstname = req.body.firstname;
        let shopname = req.body.shopname;
        let email = req.body.email;
        let userpassword = req.body.userpassword;


        email = email.trim();
        shopname = shopname.trim();
        firstname = firstname.trim();
        userpassword = userpassword.trim();

        if (firstname == "" || firstname == null) {
            res.send("You have not entered your first name. Please enter your firstname")
        }
        else if (userpassword == "" || userpassword == null) {
            res.send("You have not entered a password. Please enter your password")
        }
        else if (shopname == "" || shopname == null) {
            res.send("You have not entered your shopname. Please enter your shopname")
        }
        else {
            retailerModel.create(req.body)
            res.send("Retailer Created Successfully");
        }

    }
    catch (err) {
        res.send(err.message);
    }

});






//=====================================================
//LOGIN FOR RETAILER

retailerRouter.post('/retaillogin', async (req, res) => {

    try {

        let user = await retailerModel.findOne({ where: { email: req.body.email } });

        if (user == null) {
            res.send("Please signup before logging in");
        }
        else if (user.userpassword !== req.body.userpassword) {

            res.status(400).json({
                'message': 'Invalid Credentials ( Wrong Password )',
            })

        }
        else {
            let token = jwt.sign({ email: user.email }, process.env.SECRETKEY);
            res.cookie("token", token);
            res.send(`Welcome ${user.firstname}`);
        }
    }
    catch (err) {
        res.send(err.message);
    }
})







// MIDDLEWARE FOR TOKEN VALIDATION THAT WILL APPLY ON ALL ROUTES
retailerRouter.use((req, res, next) => {
    jwt.verify(req.cookies.token, process.env.SECRETKEY, (error) => {
        if (error) {
            res.send('Please login first')
        } else next()
    })

})






// Create an item and put it in the men's database

retailerRouter.post('/men/createItem', async function (req, res) {


    try {

        let user = retailerModel.findOne({ where: { email: req.body.email } })
        if (user == null) {
            res.status(401).send("You are not a retailer. Please signup");
        }
        else {
            try {
                let item = req.body;
                item.category = "men";
                menDbModel.create(item);
                res.send("Item created successfully")
            }
            catch (err) {
                res.send("Please give a unique id");
            }
        }

    }
    catch (err) {
        res.send(err.message)
    }


})







//CREATE ITEM FOR MEN'S, IT WILL BE STORED IN MEN'S DATABASE 

retailerRouter.post('/women/createItem', async function (req, res) {


    try {
        let user = retailerModel.findOne({ where: { email : req.body.email } })
        if (user == null) {
            res.status(401).send("You are not a retailer. Please signup");
        }
        else {
            try {
                let item = req.body;
                item.category = "men";
                womenDbModel.create(item);
                res.send("Item created successfully")
            }
            catch (err) {
                res.send(err.message);
            }
        }
    }
    catch (err) {
        res.send(err.message)
    }

})








//=======================================================

//to delete a particular item from women's database

retailerRouter.delete('/delete/women/:id', async function (req, res) {

    try {

        if (!isNaN(parseInt(req.params.id))) {

            let item = await womenDbModel.findOne({ where: { id: req.params.id } });
            console.log(item);

            if (item == null) {
                res.send("Sorry! You don't have this item")
            }
            else if (item.email != req.body.email) {
                res.send("You are not authorized to perform this action")
            }
            else {
                await womenDbModel.destroy({ where: { id: req.params.id } });
                res.json({ "message": "Item deleted successfully" });
            }
        }
        else {

            let item = await womenDbModel.findOne({ where: { product: req.params.id.toLowerCase() } });

            if (item == null) {
                res.send("Sorry! You don't have this item")
            }
            else if (item.email != req.body.email) {
                res.send("You are not authorized to perform this action")
            }
            else {
                await womenDbModel.destroy({ where: { product: req.params.id.toLowerCase() } });
                res.json({ "message": "Item deleted successfully" });
            }

        }
    } catch (err) {
        res.send(err.message);
    }

})







//=========================================================


//delete a particular item from men's database

retailerRouter.delete('/delete/men/:id', async function (req, res) {

    try {

        if (!isNaN(parseInt(req.params.id))) {

            let item = await menDbModel.findOne({ where: { id: req.params.id } });


            console.log(item);


            if (item == null) {
                res.send("Sorry! We don't have this item")
            }
            else if (item.email != req.body.email) {
                res.send("You are not authorized to perform this action")
            }
            else {
                await menDbModel.destroy({ where: { id: req.params.id } });
                res.json({ "message": "Item deleted successfully" });
            }
        }

        else {


            let item = await menDbModel.findOne({ where: { product: req.params.id.toLowerCase() } });

            if (item == null) {
                res.send("Sorry! We don't have this item")
            }
            else if (item.email != req.body.email) {
                res.send("You are not authorized to perform this action")
            }
            else {
                await menDbModel.destroy({ where: { product: req.params.id.toLowerCase() } });
                res.json({ "message": "Item deleted successfully" });
            }

        }
    } catch (err) {
        res.send(err.message);
    }

})







//==============================================

//UPDATE PARTICULAR ITEM FROM MEN'S DATABASE (FOR RETAILER)
retailerRouter.put('/update/men/:item', async function (req, res) {

    try {


        let found = await menDbModel.findOne({ where: { product: req.params.item.toLowerCase() } });

        if (found == null) {
            res.send("Sorry! You don't have this item");
        }
        else {
            let data = req.body;
            await menDbModel.update(data, {
                where: {
                    product: req.params.item,
                }
            });
            res.send("Item Updated Successfully ");
        }

    } catch (err) {
        res.send(err.message);
    }

});








//===============================================================

//UPDATE PARTICULAR ITEM FROM WOMEN'S DATABASE (FOR RETAILER)
retailerRouter.put('/update/women/:item', async function (req, res) {


    try {


        let found = await womenDbModel.findOne({ where: { product: req.params.item.toLowerCase() } });

        if (found == null) {
            res.send("Sorry! You don't have this item");
        }
        else {
            let data = req.body;
            await womenDbModel.update(data, {
                where: {
                    product: req.params.item,
                }
            });
            res.send("Item Updated Successfully ");
        }

    } catch (err) {
        res.send(err.message);
    }
}
);







//UPDATE REATILER USER'S PASSWORD
retailerRouter.put('/updatePassword', async function (req, res) {

    try {

        let item = await retailerModel.findOne({ where: { email: req.body.email } });

        if (item == null) {
            res.send("Please Signup!")
        }
        else if (item.userPassword === req.body.password) {
            res.send("Password already upto-date")
        }
        else {
            item.set({
                userpassword: req.body.password,
            });

            await item.save()

            res.send("Password Updated Successfully")

        }
    }
    catch (err) {
        res.send(err.message);
    }

});





//router.get('/logout', function (req,res){

retailerRouter.get('/logout', function (req,res){

    res.clearCookie('token');
    res.send("Logged out successfully");

})


export default retailerRouter;