//import router dari express 
const router = require('express').Router();
const multer = require('multer');
const os = require('os');

//import funds controller
const fundsController = require('./controller');
router.post('/funds',multer().none(),fundsController.store);
router.put('/funds/:id',multer().none(),fundsController.update);
router.get('/funds',fundsController.index);
router.delete('/funds/:id', fundsController.destroy);

// export router
module.exports = router;