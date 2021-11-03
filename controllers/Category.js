const Category = require('../models/Category');


exports.AddCategory = (req, res, next) => {
    const name = req.body.name;
    const desc= req.body.desc;
    Category.create({name:name, description: desc })
    .then(result => {
        res.redirect('/')
    })
    .catch(err => {
        console.log(err);
    });
    };
exports.Add = (req,res,next) => {
    res.render('Category/Add',{
        pageTitle: "Add Product",
        editMode: false

    });
}    
exports.show = (req,res,next) => {
    Category.findAll()
    .then(cat=>{
        res.render('Category/show',{
            pageTitle: 'Show Category',
            cat: cat
        })
    })
    .catch(err => console.log(err));
}
exports.getc= (req,res,next) => {
    const name= req.params.CatName;
    Category.findByPk(name)
    .then(cat =>{
        res.render('Category/showCat',{
            pageTitle: " Category",
            cat: cat
        })
    })
}
exports.Upd = (req,res,next) => {
    const id = req.params.name;
    const name = req.body.name;
    const desc = req.body.desc;
    Category.findByPk(name)
    .then(c =>{
        c.name=name;
        c.description=desc;
        return c.save();
    })
    .then(() =>
    res.redirect('/Category'))
    .catch((err) => {
        console.log(err);
    })
}
exports.back = (req,res,next)=>{
    res.redirect('/Category/show');
}
exports.delete = (req,res,next)=>{
    const name= req.body.name;
    Category.findByPk(name)
    .then(c=>{
        if(c){
            console.log(c);
        c.destroy();
        res.redirect('/');
        }
        else{console.log("5")}
    })
}
exports.beforUpd = (req,res,next) => {
    const name = req.params.name;
 Category.findByPk(name).then( c =>{
        if(c){
        res.render('Category/Add',{
            pageTitle:'Category',editMode:true, c:c
        })
    }
    }).catch(err => console.log(err))
}