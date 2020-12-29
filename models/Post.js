const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Number,
        default: new Date()
    }
});
module.exports = Post = mongoose.model('Post', postSchema);