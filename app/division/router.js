//import router dari express 
const router = require('express').Router();
const multer = require('multer');
const os = require('os');
//import division controller
const divisionController = require('./controller');
router.post('/divisions',multer().none(),divisionController.store)
router.put('/divisions/:id',multer().none(),divisionController.update);
router.get('/divisions',divisionController.index)
router.delete('/divisions/:id', divisionController.destroy);
// export router
module.exports = router;