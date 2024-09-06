const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/usersdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});


const User = mongoose.model('User', new mongoose.Schema({
    name: String,
    email: String,
    age: Number
}));


app.get('/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
});


app.post('/users', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.send(user);
});


app.get('/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.send(user);
});


app.put('/users/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(user);
});


app.delete('/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.send({ message: 'User deleted' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});