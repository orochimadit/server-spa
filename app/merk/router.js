//import router dari express 
const router = require('express').Router();
const multer = require('multer');
const os = require('os');
//import merks controller
const merksController = require('./controller');
router.post('/merks',multer().none(),merksController.store);
router.put('/merks/:id',multer().none(),merksController.update);
router.get('/merks',merksController.index);
router.delete('/merks/:id', merksController.destroy);
// export router
module.exports = router;