const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
var path= require('path');
var multer  = require('multer')
//var upload = multer({dest: path.join('./uploads'),
                                         //});
global.app = module.exports = express();

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
//app.use(express.static(__dirname+"./uploads/"));
app.use(cors());
app.use(express.json());
//app.use('/uploads', express.static('./uploads'));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/uploads', express.static(path.join(__dirname, '/product/uploads')));
const uri = process.env.ATLAS_URI;
//console.log(uri);
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const productRouter = require('./routes/productRoute');
const usersRouter = require('./routes/userRoute');

app.use('/api/products', productRouter);
app.use('/api/users', usersRouter);
//app.use('/api/products/:id', productRouter);


//app.listen(5000, () => {console.log("server started at http://localhost:5000")})
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});