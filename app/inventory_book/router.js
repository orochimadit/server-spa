//import router dari express 
const router = require('express').Router();
const multer = require('multer');
const os = require('os');
//import inventoryBooks controller
const inventoryBooksController = require('./controller');
router.post('/inventoryBooks',multer().none(),inventoryBooksController.store);
router.put('/inventoryBooks/:id',multer().none(),inventoryBooksController.update);
router.get('/inventoryBooks',inventoryBooksController.index);
router.delete('/inventoryBooks/:id', inventoryBooksController.destroy);
// export router
module.exports = router;