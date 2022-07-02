const { auth } = require('../../middlwear/auth');
const { myMulter, fileValdation } = require('../../service/multer');
const postController= require("./controller/post");
const endPoint = require('./post.endPoint');
const router = require('express').Router();


router.get("/home" , auth(endPoint.home) ,postController.home)
router.post("/post" ,myMulter('post' , fileValdation.image).single('image'),auth(endPoint.home) ,postController.post)


router.get("/post/:id" , auth(endPoint.home) , postController.getPost)
router.post("/post/:id" ,myMulter('post' , fileValdation.image).single('image'), auth(endPoint.home) , postController.updatePost)
router.get("/post/delete/:id" , auth(endPoint.home) , postController.deletePost)

module.exports =  router