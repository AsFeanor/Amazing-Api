const express = require('express');
const router = express.Router();
const { pool } = require('../dbConfig');

// Get a Reply
router.get('/:reply_id', async (req, res) => {
    const { reply_id } = req.params
    try {
        const reply = await pool.query(
            'SELECT * FROM replies WHERE reply_id = $1',
            [reply_id]
        );
        res.json(reply.rows[0])
    }catch (err){
        console.log(err.message);
    }
});

// Create a Reply
router.post('/', async (req, res) => {
    try {
        const { content,post_id,user_id } = req.body;
        const newReply = await pool.query(
            'INSERT INTO replies (content,post_id,user_id) VALUES ($1,$2,$3) RETURNING *',
            [content,post_id,user_id]
        );
        res.json(newReply.rows[0]);
    }catch (err) {
        console.log(err.message);
    }
});

// Update a Reply
router.put('/:reply_id', async (req, res) => {
    try {
        const { reply_id } = req.params;
        const { content,post_id,user_id } = req.body;
        const updatePost = await pool.query(
            'UPDATE replies SET (content,post_id,user_id) = ($1,$2,$3) WHERE reply_id = $4',
            [content,post_id,user_id,reply_id]
        );
        res.json('Reply was updated')
    }catch (err) {
        console.log(err.message);
    }
});

// Delete a Reply
router.delete('/:reply_id', async (req, res) => {
    try {
        const { reply_id } = req.params;
        const deleteReply = await pool.query(
            'DELETE FROM replies WHERE reply_id = $1',
            [reply_id]
        );
        res.json('Reply was successfully deleted!');
    }catch (err) {
        console.log(err.message);
    }
});

module.exports = router;
