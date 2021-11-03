const brand = require('../models/Brand')
const car=require('../models/Cars')
const category=require('../models/Category')
exports.GetCars = async (brandId,catName)=>{
  const b =await brand.find({'brand._id':brandId})
        if(catName == null){
            const cars= await car.find({'car.brandName': b.name});
            cars.sort((a, b) =>{
            a.updatedAt = b.updatedAt;
            })
                return cars;
        }else{
            const cars=car.find({'car.brandName': b.name,'car.CategoryName':catName});
                cars.sort((a, b) =>{
                    a.updatedAt = b.updatedAt;
                })
                return cars;
        }    
}

exports.CarsByBrand =async () =>{
    let arr = [];
    let i=0;
    try{
    const bs = await brand.find()
        bs.forEach(b => {
            const cars=await car.find({'car.brandName': b.name});
                arr[i]=cars;
                i++;           
        });
        return arr;
    }catch(err) {
        console.log(err);
    } 
}
exports.findOne= async (clas,id) =>{
    try{
const c = await clas.find({'class._id':id})
    if (!c){
        throw new Error("not found");
    }
} catch(err){
    console.log(err);
}
}
exports.beforeDelBrand = async (id)=>{
    try{
    const b = await brand.find({'brand._id':id});
    const car =await car.find({'car.brandName': b.name});
        if(car){
                throw new Error("brand related to a car"); 
            }
            return;
        }catch(err) {
            console.log(err)};

}

exports.beforeDelCat = async (id)=>{
    try{
   const c= await category.find({'category._id':id});
   const car= await car.find({'car.brandName': c.name});
            if(car){
                throw new Error("Category related to a car"); 
            }
            return;
         } catch(err) {console.log(err)};

}
exports.AddCars= async (title,desc,nbr,img,brand,cat) =>{
    try{
    const b =await brand.find({'brand.name': brand});
            if(!b){
                throw new Error("error"); 
            }
    const c =await category.find({'category.name': cat});
        if(!c){
            throw new Error("error"); 
        }
    const car = new car({
        title: title,
        description: desc,
        NbrOfRent: nbr,
        image: img,
        brandName: brand,
        categoryName: cat
    });
    await car.save()
    return;
    }catch(err) {
    console.error(err);
}
}
exports.update= async(id)=>{
    try{
    const ca =await car.find({ 'car._id': id});
    const c = await this.findOne(ca,ca.id)
     return c;  
    }catch(err){
        console.log(err);
    
}
}

exports.afterUpdate = async (id,title,desc,nbr,img,brand,cat)=>{
    try{
const bb = await brand.find({'brand.name': brand});
            if(!bb){
                throw new Error();
            }
const c = await category.find({'category.name': cat})
        if(!c){
            res.status(404).send();
        }
 const b= await car.findById(id);
        b.title=title;
        b.description=desc;
        b.NbrOfRent=nbr;
        b.Image = img;
        b.brandName=brand;
        b.categoryName = cat;
        return b.save();
    }catch(err) {
        console.log(err);
    }  
}