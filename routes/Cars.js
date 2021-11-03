const express = require('express');
const router = express.Router();
const cars= require('../controllers/Cars');
const isAuth = require('../middleware/is-auth');
router.get('/',cars.Add);
router.post('/', cars.AddCars);
router.get('/:Id',isAuth,cars.Update);
router.put('/:Id',isAuth,cars.afterUpdate);
router.get('/showCarBrand',cars.showCarsBrand);
router.delete('/:Id',isAuth,cars.deleteCar);
router.get('/showCars',cars.getCars);
router.get('/:brId/:ctName',isAuth,cars.getCarsBr);
router.get('/CarsByBrand',isAuth,cars.getCarsByBrand);
module.exports = router;
