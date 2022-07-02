const router = require('express').Router();
const signupController = require("./controller/registration")
const validators = require("./auth.validation");
const validation = require('../../middlwear/validation');
//signup
router.get("/" , signupController.getSignup)
router.post("/signup" , validation(validators.signup ,'/') ,signupController.handelSignup)

//signin
router.get("/login" , signupController.login)
router.post("/login" , validation(validators.signin ,'/login') ,signupController.handelSignIn)

router.get("/logout" , signupController.logout)




module.exports =  router