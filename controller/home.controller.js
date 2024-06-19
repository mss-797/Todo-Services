const express = require('express');
const Todo = require('../model/todo.model');

/******************************************************
 * @home
 * @route http://localhost:9090/todo/home
 * @description home API for Test
 * @returns Test Message
 ******************************************************/
const home = async(req,res) => {
    try{
        res.status(200).json({message : 'Hello Testiing API...' });
    } catch(error) {
        console.log('Error : ', error);
        res.status(500).json({message : 'Internal Server error....' });
    }
};

/******************************************************
 * @create_todo
 * @route http://localhost:9090/todo/create_todo
 * @description API for create a new todo list
 * @returns Success Message
 ******************************************************/
const create_todo = async(req,res) => {
    try{
        const { title,description } = req.body;
        const todo = new Todo({
            title: title,
            description: description,
        });
        await todo.save();
        res.status(200).json({message : 'Todo created successfully... ', todo });
    } catch(error) {
        console.log('Error : ', error);
        res.status(500).json({message: 'Internal Server error...'});
    }
};

/******************************************************
 * @get_All_Todo
 * @route http://localhost:9090/todo/get_All_Todo
 * @description API for get All todo list
 * @returns Todo object
 ******************************************************/
const getAllTodo = async(req,res) => {
    try {
        const all_todo = await Todo.find();
        if(!all_todo) {
            return res.status(401).json({message: 'Records not found...'});
        }
        res.status(200).json({message : 'View All Todo list...', all_todo});
    } catch(error) {
        console.log('Error : ', error);
        res.status(500).json({message: 'Internal Server error....'});
    }
};

/******************************************************
 * @get_todo_by_id/:todo_id
 * @route http://localhost:9090/todo/get_todo_by_id/:todo_id
 * @description API for get specific todo list by its id
 * @returns Todo object
 ******************************************************/
const get_todoById = async(req,res) => {
    try{
        const { todo_id } = req.params;
        const todo = await Todo.findOne({ _id: todo_id });
        if(!todo) {
            return res.status(401).json({message: 'Todo list not found...'});
        }
        res.status(200).json({ message: 'Todo list...', todo });
    } catch(error) {
        console.log('Error : ', error);
        res.status(500).json({meessage: 'Internal Server error...'});
    }
};


/******************************************************
 * @update_todo/:todo_id
 * @route http://localhost:9090/todo/update_todo/:todo_id
 * @description API for update specific todo list by its id
 * @returns Todo object
 ******************************************************/
const update_todo = async(req,res) => {
    try {
        const { todo_id } = req.params;
        const { title, description, completed } = req.body;
        const updated_todo = await Todo.findByIdAndUpdate(
            todo_id,
            {
                title: title,
                description: description,
                completed: completed,
            },
            {
                new: true
            }
        );
        if (!updated_todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json({message: 'Todo Updated Success fully...', updated_todo})
    } catch(error) {
        consoele.log('Error : ', error);
        res.status(500).json({message: 'Internal Server error...'});
    }
}

/******************************************************
 * @delete_todo/:todo_id
 * @route http://localhost:9090/todo/delete_todo/:todo_id
 * @description API for delete specific todo list by its id
 * @returns Success message
 ******************************************************/
const delete_todo = async(req,res) => {
    try {
        const { todo_id } = req.params;
        const deletedTodo = await Todo.findByIdAndDelete({ _id: todo_id });
        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json({message: 'Todo deleted Successfully...'});
    } catch(error) {
        console.log('Error : ', )
    }
}

module.exports = { home, create_todo, getAllTodo, get_todoById, update_todo, delete_todo };