const postModel = require("../../../DB/model/post")

const home = async (req, res) => {

    const fileErr = req.flash('fileErr')[0]

    const postList = await postModel.find({})
    res.render("home", {
        fileErr,
        postList
    })
}


const post = async (req, res) => {

    if (req.fileErr) {
        req.flash('fileErr', true)
        res.redirect('/home')
    } else {
        const { title, desc } = req.body
        const imageURL = `${req.finalDestination}/${req.file.filename}`
        await postModel.insertMany({
            title,
            desc,
            imageURL,
            createdBy: req.session.findUser._id
        })
        res.redirect("/home")
    }

}



const getPost = async (req, res) => {

    const { id } = req.params;
    const post = await postModel.findById(id);
    res.render('updatePost', {
        post
    })
}

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, desc } = req.body;
    if (req.fileErr) {
        req.flash('fileErr', true)
        res.redirect(`/post/${id}`)
    } else {
        const imageURL = `${req.finalDestination}/${req.file.filename}`

        await postModel.findOneAndUpdate({
            _id: id,
            createdBy: req.session.findUser._id
        }, {
            title,
            desc,
            imageURL
        });
        res.redirect('/home')
    }
}
const deletePost = async (req, res) => {
    const { id } = req.params;
  
        await postModel.findByIdAndDelete({
            _id: id,
            createdBy: req.session.findUser._id
        });
        res.redirect('/home')

}






module.exports = {
    home,
    post,
    getPost,
    updatePost,
    deletePost
}