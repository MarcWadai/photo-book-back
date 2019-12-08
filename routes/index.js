var express = require('express');
var router = express.Router();
const AWS = require('aws-sdk');
var multerS3 = require('multer-s3');
const multer = require('multer');
const config = require('../config');
const BUCKET_NAME = 'marcoucou-photo-book';
const REGION = 'eu-west-1';
const mongoMgmt = require('../services/db_mgmt');
const cors = require('cors');


AWS.config.update({
  accessKeyId: config.iam_access_id,
  secretAccessKey: config.iam_secret,
  region: REGION,
});

//Creating a new instance of S3:
const s3= new AWS.S3();

var upload = multer({
  storage: multerS3({
      s3: s3,
      bucket: BUCKET_NAME,
      acl: 'public-read',
      key: function (req, file, cb) {
        console.log('req', req);
          console.log(file);
          cb(null, file.originalname); //use Date.now() for unique file keys
      }
  })
});

/* POST elements to the store. */
router.post('/data', async function(req, res, next) {
  try {
    const result = await mongoMgmt.insert(req.body);
    res.send(result)
  } catch(err) {
    res.status(err).send(err);
  }
});

/* GET elements stories. */
router.get('/data', cors(), async function(req, res, next) {
  try {
    const result = await mongoMgmt.get();
    res.send(result)
  } catch(err) {
    res.status(err).send(err);
  }
});

/* Post an image */
router.post('/image', upload.array('image', 1), function(req, res, next) {
 /*  console.log('req', req.files); */
  res.status(200).json(req.files);
});
module.exports = router;
