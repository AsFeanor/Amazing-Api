const express = require('express');
const router = express.Router();
const { pool } = require('../dbConfig');
const replies = require('./replies')


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
router.get('/:post_id', async (req, res) => {
    const { post_id } = req.params
    try {
        const post = await pool.query(
            'SELECT * FROM posts WHERE post_id = $1',
            [post_id]
        );
        res.json(post.rows[0])
    }catch (err){
        console.log(err.message);
    }
});

// Create a Post
router.post('/', async (req, res) => {
    try {
        const { content,title,user_id,user_name,date,member_since } = req.body;
        const newPost = await pool.query(
            'INSERT INTO posts (content,title,user_id,user_name,date,member_since) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
            [content,title,user_id,user_name,date,member_since]
        );
        res.json(newPost.rows[0]);
    }catch (err) {
        console.log(err.message);
    }
});

// Update a Post
router.put('/:post_id', async (req, res) => {
    try {
        const { post_id } = req.params;
        const { title,content,user_id } = req.body;
        const updatePost = await pool.query(
            'UPDATE posts SET (title,content,user_id) = ($1,$2,$3) WHERE post_id = $4',
            [title,content,user_id,post_id]
        );
        res.json('Post was updated')
    }catch (err) {
        console.log(err.message);
    }
});

// Delete a Post
router.delete('/:post_id', async (req, res) => {
    try {
        const { post_id } = req.params;
        const deletePost = await pool.query(
            'DELETE FROM posts WHERE post_id = $1',
            [post_id]
        );
        res.json('Post was successfully deleted!');
    }catch (err) {
        console.log(err.message);
    }
});

router.use('/:post_id/replies', replies);

module.exports = router;
