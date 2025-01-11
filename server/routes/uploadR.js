const express = require('express');
const multer = require('multer');
const cloudinary = require('../configs/upload.js');

const upload = multer({ dest: 'uploads/' });  

const router = express.Router();

router.post('/',  upload.single('image'), async (req, res) => {
    try {
       
      console.log('File received:', req.file); 
      const result = await cloudinary.uploader.upload(req.file.path);
      res.json({
        success: true,
        imageUrl: result.secure_url,
      });
    } catch (error) {
      console.error('Error uploading image:', error); 
      res.status(500).json({
        success: false,
        message: 'Image upload failed.',
      });
    }
  });
  

module.exports = router;
