const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');

router.get('/', async (req, res) => {
    try {
        const blogs = await BlogPost.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const blog = new BlogPost({
        title: req.body.title,
        content: req.body.content
    });

    try {
        const newBlog = await blog.save();
        res.status(201).json(newBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
