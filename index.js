const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const dotenv = require('dotenv');
dotenv.config();


const app = express();
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const postRoutes = require('./routes/posts');

app.get('/', (req, res) => {
    res.send('<h1>Hello From memory App </h1>');
});
app.use('/posts', postRoutes);
const port = process.env.PORT || 5000;

mongoose.connect(process.env.connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(5000, () => console.log(`Server running at port: ${port}`)))
    .catch((error) => console.log(error.message));
mongoose.set('useFindAndModify', false);