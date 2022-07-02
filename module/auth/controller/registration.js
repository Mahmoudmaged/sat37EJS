const userModel = require("../../../DB/model/User")
const bcrypt = require('bcryptjs')


const getSignup = (req, res) => {
    const userExist = req.flash('userExist')[0]
    const oldInputs = req.flash('oldInputs')[0]
    const catchErr = req.flash("catchErr")[0]

    let validationErr = req.flash('validationErr')[0]
    if (validationErr) {
        validationErr = validationErr.map(ele => {
            return ele.path[0]
        })
    }
    console.log({ validationErr });

    res.render('signup', {
        userExist,
        oldInputs,
        catchErr,
        validationErr
    })
}


const handelSignup = async (req, res) => {
    try {
        const { userName, email, password } = req.body

        const user = await userModel.findOne({ email });
        if (user) {
            req.flash('userExist', true) // [ true]
            req.flash('oldInputs', req.body)
            res.redirect("/")

        } else {
            const hashPassword = await bcrypt.hash(password, parseInt(process.env.saltRound))
            const newUser = new userModel({ userName, email, password: hashPassword })
            const savedUser = await newUser.save()
            res.redirect('/login')
        }
    } catch (error) {
        req.flash("catchErr", true)
        req.flash('oldInputs', req.body)
        res.redirect('/')
    }

}


///login
const login = (req, res) => {
    const userExist = req.flash('userExist')[0]
    const wrongPassword = req.flash('wrongPassword')[0]
    const oldInputs = req.flash('oldInputs')[0]
    const catchErr = req.flash("catchErr")[0]

    let validationErr = req.flash('validationErr')[0]
    if (validationErr) {
        validationErr = validationErr.map(ele => {
            return ele.path[0]
        })
    }
    res.render('login', {
        userExist,
        oldInputs,
        catchErr,
        validationErr,
        wrongPassword
    })
}


const handelSignIn = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email });
        if (!user) {
            req.flash('userExist', true) // [ true]
            req.flash('oldInputs', req.body)
            res.redirect("/login")
        } else {
            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                req.flash('wrongPassword', true)
                req.flash('oldInputs', req.body)
                res.redirect("/login")
            } else {
                req.session.user = { userID: user._id, isLoggedIn: true }
                res.redirect('/home')
            }
        }
    } catch (error) {
        req.flash("catchErr", true)
        req.flash('oldInputs', req.body)
        res.redirect('/')
    }

}



const logout = (req, res) => {
    req.session.destroy();
    res.redirect("/login")
}

module.exports = {
    getSignup,
    handelSignup,
    login,
    handelSignIn,
    logout
}