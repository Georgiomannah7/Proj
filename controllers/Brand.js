const brand = require('../models/Brand');
exports.get= (req, res, next) => {
    res.redirect('/cars');
}
exports.getb= (req, res, next) => {
    res.render('Brand/ShowBrand',{
        pageTitle: 'Brand',editMode:false
    });
}
exports.getAll=(req, res, next) => {
    brand.findAll()
    .then(brand =>{
        res.render('Brand/Show', {
            pageTitle: 'ShowBrand',
            brand: brand
        });
     } )
    .catch((err) =>{
        console.log(err);
    });
}
exports.getAl=(req, res, next) => {
    const bran = req.params.brandName;
    brand.findByPk(bran)
    .then(brand =>{
        res.render('Brand/Details', {
            pageTitle: 'ShowBrand',
            brand: brand
        });
     } )
    .catch((err) =>{
        console.log(err);
    });
}
exports.create = (req, res, next) => {
    const name = req.body.name;
    const desc = req.body.desc;
    let nbr = req.body.check;
    if(nbr == true){
        nbr=true;
    }else{
        nbr=false;
    }
    brand.create({name:name , description:desc ,showNbrOfCars:true})
    .then(() =>
    res.redirect('/Brand')
    )
    .catch((err) => {
        console.log(err);
    })
}
exports.delete=(req, res, next) =>{
    const name = req.body.name;
    brand.findByPk(name)
    .then(brand =>{
        brand.destroy();
        res.redirect('/Brand');
    })
    .catch((err) => {
        console.log(err);
    })
}
exports.beforeupdate = (req, res, next) =>{
    const name = req.body.name;
    console.log(name);
 brand.findByPk(name).then( b =>{
        if(b){
        res.render('Brand/ShowBrand',{
            pageTitle:'Brand',editMode:true, brand:b
        })
    }
    }).catch(err => console.log(err))
  
}
exports.update = (req, res, next)=>{
    const name = req.body.name;
    const desc = req.body.desc;
    let nbr = req.body.check;
    if(nbr == true){
        nbr=true;
    }else{
        nbr=false;
    }
    brand.findByPk(name)
    .then(b =>{
        b.name=name;
        b.description=desc;
        b.showNbrOfCars=nbr;
        return b.save();
    })
    .then(() =>
    res.redirect('/Brand'))
    .catch((err) => {
        console.log(err);
    })
}
exports.list =(req,res,next) =>{
    let a = [];
    let i =0;
    brand.findAll()
    
    .then(brands =>{
        brands.sort((a,b)=>{
            if(a.createdAt>b.createdAt){
                return -1;
            }else{
                return 1;
            }
        })
         brands.forEach(brand => {
        brand.countCars().then(x =>{    
         a[i]= x;
         i++;
      });
    });
    return a;
    }).then(() =>{
        brand.findAll()
    .then(brands =>{
        brands.sort((a,b)=>{
            if(a.createdAt>b.createdAt){
                return -1;
            }else{
                return 1;
            }
        })
      res.render('Brand/list',{pageTitle:'list of brands',brands:brands,arr:a,i:0});
      })
    })
    
    .catch(err=>console.log(err))
}