const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Blog = require('../models/Blogs');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All 
router.get('/fetchallblogs/:id', async (req, res) => {
    try {

        let query = req.query;
        if(req.params.id !== "undefined"){
            query._id = req.params.id
        }
        const blogs = await Blog.find(query).sort({"_id" : -1});
        res.json(blogs)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Blog using: POST "/api/blogs/addblog". Login required
router.post('/addblog', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('subtitle', 'Subtitle must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const blog = new Blog({
                ...req.body, user: req.user.id
            })
            const savedBlog = await blog.save()

            res.json(savedBlog)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })


router.put('/updateblog/:id', fetchuser, async (req, res) => {
    const { title, subtitle, body } = req.body;
    try {
        // Create a newBlog object
        const newBlog = {};
        if (title) { newBlog.title = title };
        if (subtitle) { newBlog.subtitle = subtitle };
        if (body) { newBlog.body = body };

        // Find the blog to be updated and update it
        let blog = await Blog.findById(req.params.id);
        if (!blog) { return res.status(404).send("Not Found") }

        if (blog.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        blog = await Blog.findByIdAndUpdate(req.params.id, { $set: newBlog }, { new: true })
        res.json({ blog });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.delete('/deleteblog/:id', fetchuser, async (req, res) => {
    try {
        // Find the blog to be delete and delete it
        let blog = await Blog.findById(req.params.id);
        if (!blog) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Blog
        if (blog.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        blog = await Blog.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Blog has been deleted", blog: blog });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router