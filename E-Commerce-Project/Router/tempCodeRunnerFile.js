
    try {

        let item = await signUpModel.findOne({ where: { email: req.body.email } });

        if (item == null) {
            res.send("Please Signup!")
        }
        else if (item.userPassword === req.body.password) {
            res.send("Password already upto-date")
        }
        else {
            item.set({
                userPassword: req.body.password,
            });

            await item.save()

            res.send("Password Updated Successfully")

        }
    }
    catch (err) {
        res.send(err.message);
    }

});