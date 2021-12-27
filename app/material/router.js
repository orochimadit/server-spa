//import router dari express 
const router = require('express').Router();
const multer = require('multer');
const os = require('os');
//import materials controller
const materialsController = require('./controller');
router.post('/materials',multer().none(),materialsController.store);
router.put('/materials/:id',multer().none(),materialsController.update);
router.get('/materials',materialsController.index);
router.delete('/materials/:id', materialsController.destroy);
// export router
module.exports = router;