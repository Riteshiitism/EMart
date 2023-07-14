const Product = require('./../models/productModel')

const  findByName  = async  (name)=>{
    name=name.toLowerCase();
    // console.log(name);
    const products = await Product.find()
    const results = products.filter((product)=> product.name.toLowerCase().includes(name));
    return results;
}   
const filterByPrice= async (price)=>{
    // console.log(price);
    const objs =await Product.find({
        "price":{
            $lte:price
        }
    })
    // console.log("its Me");
    // console.log(objs);
    return(objs);
}
const CreateProduct = async (obj)=>{
    const entry = new Product(obj)
    // console.log(entry)
    // console.log()
    try{
        await entry.save()
        // res.send(entry.tagsUI);
      }
      catch(err){
          console.log("Error occured while saving the entry",err)
      }

    return(entry)
}
const findByID = async (list)=>{
    const obj = await Product.find({
        '_id':{
            $in:list
        }
    })
    return(obj)
}
module.exports = {
    findByName,CreateProduct,filterByPrice,findByID
}