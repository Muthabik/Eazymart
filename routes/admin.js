var express = require('express');
const {render}=require('../app');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var productHelper=require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
 productHelpers.getAllProducts().then((products)=>{
   console.log(products);
  res.render('admin/view-products',{admin:true,products} );

 })
  
});
router.get('/add-product',function(req,res){
  res.render('admin/add-product')
})
router.post('/add-product',(req,res)=>{
  console.log(req.body);

  console.log(req.files.Image);
 

  productHelpers.addProduct(req.body,(id)=>{
    let image=req.files.Image
    console.log(id);
    image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render("admin/add-product")
        
      }else{
        console.log(err);
      }

    })
    
  })
})
router.get('/delete-product/:id',(req,res)=>{
  let prodId=req.params.id
  console.log(prodId);
  productHelpers.deleteProduct(prodId).then((response)=>{
    res.redirect('/admin/')
  })
})

router.get('/edit-product/:id',async(req,res)=>{
  let product=await productHelpers.getProductsDetails(re.params.id)
  res.render('admin/edit-product')
})

module.exports = router;
