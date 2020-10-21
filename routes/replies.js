const express = require('express');
const router = express.Router();
const { pool } = require('../dbConfig');

// Get a Reply
router.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const reply = await pool.query(
            'SELECT * FROM replies WHERE id = $1',
            [id]
        );
        res.json(reply.rows[0])
    }catch (err){
        console.log(err.message);
    }
});

// Create a Reply
router.post('/', async (req, res) => {
    try {
        const { content } = req.body;
        const newReply = await pool.query(
            'INSERT INTO replies (content) VALUES ($1) RETURNING *',
            [content]
        );
        res.json(newReply.rows[0]);
    }catch (err) {
        console.log(err.message);
    }
});

// Update a Reply
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const updatePost = await pool.query(
            'UPDATE replies SET content = $1 WHERE id = $2',
            [content,id]
        );
        res.json('Reply was updated')
    }catch (err) {
        console.log(err.message);
    }
});

// Delete a Reply
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteReply = await pool.query(
            'DELETE FROM replies WHERE id = $1',
            [id]
        );
        res.json('Reply was successfully deleted!');
    }catch (err) {
        console.log(err.message);
    }
});

module.exports = router;
