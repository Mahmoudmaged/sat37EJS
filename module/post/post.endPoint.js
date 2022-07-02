const { roles } = require("../../middlwear/auth");


const endPoint = {
    home:[roles.Admin , roles.User]
}

module.exports =endPoint