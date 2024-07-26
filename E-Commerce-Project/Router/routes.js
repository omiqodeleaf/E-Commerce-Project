import express from 'express';
import { authenticateNormalUser } from '../Middleware/middleware.js';
import { signUpModel } from '../Models/UserSignUpSchema.js';
import { menDbModel } from '../Models/menCLothDbSchema.js';
import jwt from 'jsonwebtoken';
import { womenDbModel } from '../Models/womenCLothDbSchema.js';
const router = express.Router();


//LOGIN USER AND GIVE FEEDBACK IF USER DOESN'T EXIST OR ENTERS THE WRONG PASSWORD
router.post('/login', async (req, res) => {

    try {

        let user = await signUpModel.findOne({ where: { email: req.body.email } });

        if (user == null) {
            res.send("Please signup before logging in");
        }
        else if (user.userpassword !== req.body.userpassword) {

            res.status(401).json({
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






//============================================

//CREATE NEW USER AND CHECK IF THE USER ALREADY EXISTS
router.post('/signup', authenticateNormalUser, (req, res) => {

    try {
        
        let firstname = req.body.firstname;
        firstname = firstname.trim();

        if (firstname == "" || firstname == null) {
            res.send("You have not entered your first name. Please enter your firstname")
        }
        else {
            signUpModel.create(req.body)
            res.send("User Created Successfully")
        }

    }
    catch (err) {
        res.send(err.message);
    }

});








//=================================================

//MIDDLEWARE FOR TOKEN VALIDATION
router.use((req, res, next) => {
    jwt.verify(req.cookies.token, process.env.SECRETKEY, (error) => {
        if (error) {
            res.send('Please login first')
        } else next()
    })

})








//====================================================

//GET ALL DATA FORM THE DATABASE ( SHOW ALL ITEMS OF MEN )
router.get('/getAll/men', async function (req, res) {

    try {
        const data = await menDbModel.findAll();
        res.json(data);
    }
    catch (err) {
        res.send(err.message);
    }

})








//GET ALL DATA FORM THE DATABASE ( SHOW ALL ITEMS OF WOMEN )
router.get('/getAll/women', async function (req, res) {
    // console.log(typeof req);
    try {
        const data = await womenDbModel.findAll();
        res.json(data);
    }
    catch (err) {
        res.send(err.message);
    }

})








//GET A PARTICULAR DATA FROM THE MEN'S DATABASE OR INFORM IF THE DESIRED DATA NOT EXISTS (WE CAN GET ITEM USING NAME OR USING ID AS WELL)
router.get('/get/men/:id', async function (req, res) {


    try {
        if (!isNaN(parseInt(req.params.id))) {

            let item = await menDbModel.findOne({ where: { id: req.params.id } });

            if (item == null) {
                res.send("Sorry! We don't have this item")
            }
            else {
                res.send(item);
            }
        }
        else {

            let item = await menDbModel.findOne({ where: { title: req.params.id.toLowerCase() } });

            if (item == null) {
                res.send("Sorry! We don't have this item")
            }
            else {
                res.send(item);
            }

        }
    } catch (err) {
        res.send(err.message);
    }

})






//=========================================================

//GET A PARTICULAR DATA FROM THE WOMEN'S DATABASE OR INFORM IF THE DESIRED DATA NOT EXISTS (WE CAN GET ITEM USING NAME OR USING ID AS WELL)
router.get('/get/women/:id', async function (req, res) {


    try {
        if (!isNaN(parseInt(req.params.id))) {

            let item = await womenDbModel.findOne({ where: { id: req.params.id } });

            if (item == null) {
                res.send("Sorry! We don't have this item")
            }
            else {
                res.send(item);
            }
        }
        else {

            let item = await womenDbModel.findOne({ where: { title: req.params.id.toLowerCase() } });

            if (item == null) {
                res.send("Sorry! We don't have this item")
            }
            else {
                res.send(item);
            }

        }
    } catch (err) {
        res.send(err.message);
    }

})







//======================================================================

//UPDATE USER'S PASSWORD
router.put('/updatepassword', async function (req, res) {

    try {

        let item = await signUpModel.findOne({ where: { email: req.body.email } });

        if (item == null) {
            res.send("Please Signup!")
        }
        else if (item.userpassword === req.body.userpassword) {
            res.send("You are using the same password")
        }
        else {

            await signUpModel.update(req.body, {
                where: {
                    email: req.body.email,
                }
            });

            res.send("Password Updated Successfully")

        }
    }
    catch (err) {
        res.send(err.message);
    }

});


router.get('/logout', function (req,res){

    res.clearCookie('token');
    res.send("Logged out successfully");

})


export default router;