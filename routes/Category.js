const express = require('express');
const router = express.Router();
const CatCtrl= require('../controllers/Category');
router.post('/Category/Add',CatCtrl.AddCategory);
router.get('/Category',CatCtrl.Add);
router.get('/Category/CatDet/:CatName',CatCtrl.getc);
router.post('/Category/show',CatCtrl.show);
router.get('/Category/Upd/:name',CatCtrl.beforUpd);
router.post('/Category/Upd/:name',CatCtrl.Upd);
router.post('/Category/Category/show',CatCtrl.back)
router.post('/Category/BrandDel',CatCtrl.delete);
module.exports = router;

