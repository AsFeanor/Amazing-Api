const express = require('express');
const router = express.Router();
const { pool } = require('../dbConfig');


// Get All Posts
router.get('/', async (req, res) => {
    try {
        const allPosts = await pool.query('SELECT * FROM posts');
        res.json(allPosts.rows);
    }catch (err) {
        console.log(err.message);
    }
});

// Get a Post
router.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const post = await pool.query(
            'SELECT * FROM posts WHERE id = $1',
            [id]
        );
        res.json(post.rows[0])
    }catch (err){
        console.log(err.message);
    }
});

// Create a Post
router.post('/', async (req, res) => {
    try {
        const { content,title } = req.body;
        const newPost = await pool.query(
            'INSERT INTO posts (content,title) VALUES ($1,$2) RETURNING *',
            [content,title]
        );
        res.json(newPost.rows[0]);
    }catch (err) {
        console.log(err.message);
    }
});

// Update a Post
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title,content } = req.body;
        const updatePost = await pool.query(
            'UPDATE posts SET (title,content) = ($1,$2) WHERE id = $3',
            [title,content,id]
        );
        res.json('Post was updated')
    }catch (err) {
        console.log(err.message);
    }
});

// Delete a Post
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletePost = await pool.query(
            'DELETE FROM posts WHERE id = $1',
            [id]
        );
        res.json('Post was successfully deleted!');
    }catch (err) {
        console.log(err.message);
    }
});

module.exports = router;
