const mongoose = require('mongoose');


const postScheama = new mongoose.Schema({
    title: String,
    desc: String,
    imageURL: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
})


const postModel = mongoose.model('Post', postScheama);
module.exports = postModel