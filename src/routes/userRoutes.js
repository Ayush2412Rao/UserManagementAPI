const express = require('express');
const User = require('../models/userModel'); 
const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const { name, email, password, age } = req.body;
        const newUser = new User({ name, email, password, age });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        if (error.code === 11000) {
            res.status(409).json({ message: 'Email already exists' });
        } else {
            res.status(400).json({ message: 'Failed to create user', error });
        }
    }
});


router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve users', error });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve user', error });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const { name, email, password, age } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, password, age },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update user', error });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user', error });
    }
});

module.exports = router;
