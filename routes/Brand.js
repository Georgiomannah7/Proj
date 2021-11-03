const express = require('express');
const router = express.Router();
const brand= require('../controllers/Brand');
router.post('/Brand/add',brand.create);
router.post('/Brand/edit',brand.update);
router.post('/Brand/Upd',brand.beforeupdate);
router.post('/BrandDel',brand.delete);
router.post('/Brand',brand.getAll);
router.get('/BrandDet/:brandName',brand.getAl);
router.get('/Brand/list',brand.list);
router.get('/Brand',brand.getb);
router.get('/',brand.get);

module.exports = router;
