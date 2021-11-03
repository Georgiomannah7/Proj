const cars =require('../models/Cars')
const brand= require('../models/Brand')
const category= require('../models/Category')
const services= require('../util/services')
exports.Add = (req,res,next) => {
    res.send();
}
exports.Update= async (req, res, next) => {
    const id = req.params.title;
    try{
    const c = await services.update(id)
    res.send({c:c});
    } catch (err){
        console.log(err);
    }
}

exports.deleteCar = async (req, res, next) => {
    const carId = req.body.carId;
    services.findOne(cars,carId);
    try{
    cars.findByIdAndRemove(carId)
    } catch(err){
        console.log(err);
    }

}
exports.AddCars = async (req, res, next) => {
    const title = req.body.title;
    const desc = req.body.desc;
    const nbr = req.body.NbrOfRent;
    const img  = req.body.image;
    const brand = req.body.brand;
    const cat = req.body.category;
    try{
    await services.AddCars(title,desc,nbr,img,brand,cat);
     res.send('done');
    } catch (err){
        console.log(err);
    }
}

exports.getCars = async (req, res,next) => {
    try{
    const cars = await cars.findAll();
    res.send({cars:cars});  
    } catch (err){
        console.log(err);
    }
}
exports.showCars = async (req, res, next) => {
    const brand = req.body.brand;
    try{
    const cars =await cars.find({where: {brandName: brand}});
    res.send({cars:cars})
    }catch(err) {
        console.log(err);
    } 
    }
   
    exports.afterUpdate = async (req, res, next)=>{
        const id = req.params.id;
        const title = req.body.title;
        const desc = req.body.desc;
        const nbr = req.body.NbrOfRent;
        const img  = req.body.image;
        const brand = req.body.brand;
        const cat = req.body.category;
        try{
        await services.afterUpdate(id,title,desc,nbr,img,brand,cat);      
        res.send('done')   
        } catch(err){
            console.log(err)};            
    }
exports.getCarsBr = async (req, res, next) => {
    const bId = req.params.brandId;
    const cat = req.params.categoryname;
    try{
    const cars = await services.GetCars(bId,cat);
    res.send({cars:cars});
    }catch(err){
        console.log(err)};
}

exports.CarsByBrand= async (req, res, next) => {
    try{
    const cars = await services.CarsByBrand();
    res.send({cars:cars});
    } catch (err){
        console.log(err)};
    }

