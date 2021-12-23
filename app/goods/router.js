//import router dari express 
const router = require('express').Router();
const multer = require('multer');
const os = require('os');
//import goods controller
const goodsController = require('./controller');
router.post('/goods',multer().none(),goodsController.store);
router.put('/goods/:id',multer().none(),goodsController.update);
router.get('/goods',goodsController.index);
router.delete('/goods/:id', goodsController.destroy);
// export router
module.exports = router;