import { signUpModel } from "../Models/UserSignUpSchema.js";
import { retailerModel } from "../Models/RetailerSignUpSchema.js";

const authenticateNormalUser = async (req, res, next) => {

    let userEmail = req.body.email;
    const isPresent = await signUpModel.findOne({ where: { email: userEmail } });

    if (isPresent == null) {
        console.log('Not found!');
        next()
    } else {
        console.log(isPresent.email);
        res.send(`User already registered with the ${userEmail} id, Please use a different email id`);
    }

}


// const authorizedUser = async (req, res, next) => {

//     let userEmail = req.body.email;
//     const isPresent = await retailerModel.findOne({ where: { email: userEmail } });

//     if (isPresent == null) {
//         res.send("You are not a retailer! Please become a retailer to perform this action")
//     }

//     else {
//         next();
//     }

// }

const authenticateRetailer = async (req, res, next) => {


    let userEmail = req.body.email;
    const isPresent = await retailerModel.findOne({ where: { email: userEmail } });

    if (isPresent == null) {
        console.log('Not found!');
        next()
    } else {
        res.send(`User already registered with the ${userEmail} id, Please use a different email id`);
    }

}


export { authenticateNormalUser, authenticateRetailer }