//import router dari express 
const router = require('express').Router();
const multer = require('multer');
const os = require('os');
//import types controller
const typesController = require('./controller');
router.post('/types',multer().none(),typesController.store);
router.put('/types/:id',multer().none(),typesController.update);
router.get('/types',typesController.index);
router.delete('/types/:id', typesController.destroy);
// export router
module.exports = router;