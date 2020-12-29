const mongoose = require('mongoose');
const Post = require('../models/Post');
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.createPost = async (req, res) => {
    const post = req.body;
    const newPost = new Post(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};
exports.updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No Post With That Id');
    } const updatedPost = await Post.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
    res.json(updatedPost);

}
exports.deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No Post With That Id');
    } await Post.findByIdAndRemove(id);
    res.json({ message: "Post Deleted SuccessFully" });

}
exports.likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No Post With That Id');
    }
    const post = await Post.findById(id);
    const updatePost = await Post.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    res.json(updatePost);

}