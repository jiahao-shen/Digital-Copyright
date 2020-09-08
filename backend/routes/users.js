var express = require('express');
var router = express.Router();
const controller = require('../controllers/controller')
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../public/images'))
  },
  filename: function(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`)
  }
})
const upload = multer({storage: storage})
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/login', controller.login);
router.post('/logout', function(req, res, next) {
  res.send({
    code: 20000,
    data: {
      
    }
  })
})
router.get('/getInfo', controller.getInfo)
router.post('/register', controller.register)
router.post('/whetherRegister', controller.whetherRegister)
router.post('/setInfo', controller.setInfo)
router.post('/handleUpload', upload.single('avatar'), controller.handleUpload)
router.post('/multiUpload', upload.array('files'), controller.multiUpload)
router.post('/uploadArticle', controller.uploadArticle)
router.post('/getImage', controller.getImage)
router.post('/monitImage', controller.monitImage)
router.post('/cancelMonit', controller.cancelMonit)
router.post('/transferAsset', controller.transferAsset)
router.get('/getAllImages', controller.getAllImages)
router.post('/checkImage', controller.checkImage)
router.post('/monitAcceptor', controller.monitAcceptor)
module.exports = router;
