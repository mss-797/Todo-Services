const express = require('express');
const router = express.Router();
const { home, create_todo, getAllTodo, get_todoById, update_todo, delete_todo } = require('../controller/home.controller');

router.get('/home', home);
router.post('/create_todo', create_todo);
router.get('/get_All_Todo', getAllTodo);
router.get('/get_todo_by_id/:todo_id', get_todoById);
router.put('/update_todo/:todo_id', update_todo);
router.delete('/delete_todo/:todo_id', delete_todo);

module.exports = router;