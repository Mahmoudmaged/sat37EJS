const dataMethod = ['body', 'params', 'query']


const validation = (schema, page) => {


    return (req, res, next) => {
        const validationArr = []
        dataMethod.forEach(key => {
            if (schema[key]) {
                const validationResult = schema[key].validate(req[key], { abortEarly: false })
                if (validationResult.error) {
                    validationArr.push(validationResult.error.details)
                }
            }
        })


        if (validationArr.length) {
            req.flash('validationErr', validationArr)
            req.flash('oldInputs', req.body)
            res.redirect(page)
        } else {
            next()
        }

    }
}


module.exports = validation



