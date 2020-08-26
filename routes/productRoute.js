const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var path= require('path');
var multer  = require('multer')
//var upload = multer({dest: path.join('./uploads'),});
router.use(express.static(__dirname+"./uploads"));
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  });
  var upload = multer({ storage:storage })
// const fileFilter=(req, file, cb) => {
//      if(file.mimetype === 'image/jpeg' || file.mimetype ==='image/jpg' || file.mimetype ==='image/png'){
//      cb(null,true);
//      } else{
//         cb(null,true);
//      }
//     }
// var upload = multer({storage:storage,
//                     limits:{
//                         filesSize:1024 * 1024 * 5
//                     } });
let Product = require('../models/productModel');

router.route('/').get((req, res) => {
    Product.find()
    .then(product => res.json(product))
    .catch(err => res.status(400).json('Error:' + err));
});
router.route('/add').post(upload.single('image'),(req, res) =>{
  const _id = mongoose.Types.ObjectId()
    console.log(req.file);
    const productid = req.body.productid;
    const name = req.body.name;
    const category= req.body.category;
    const image = req.file.path;
    const price = req.body.price;
    const brand = req.body.brand;
    const rating = req.body.rating;
    const numReviews = req.body.numReviews;
    const countInStock = req.body.countInStock;
    const product = new Product({
                _id,
                productid,
                name,
                category,
                image,
                price,
                brand,
                rating,
                numReviews,
                countInStock
            });
           
            product.save()
    .then(() => res.json('Product added!'))
    .catch(err => res.status(400).json('Error:' + err));
});
// router.route('/:id').get((req, res) => {
//   const productId = req.params.id;
//   // const product = Product.find()
//   // console.log(productId);
//   // console.log(productid);
  
//   //  if(product)
//   // res.send(product);
//   // else
//   // res.status(404).send({msg: "Product Not Found"})
//   // const product = Product.findOne({ where: { productid : [productId] } })
//   //     //res.json({product: [product], message: 'product obtained'})
//   //   .then(product => res.json(product))
//   //   .catch(err => res.status(400).json('Error:' + err));
//   Product.find()
//     .then(product => res.json(product))
//     .catch(err => res.status(400).json('Error:' + err));
// });
router.get('/:id', async(req, res) =>{
  const productId = req.params.id;
  const product = await Product.findOne({
     _id:productId,      
  })
  if(product)
  {
  res.send(product);
  console.log(product);
  }
  else
  res.status(404).send({msg: "Product Not Found"})

})


module.exports =  router;