const cloudinary = require('cloudinary').v2;
const userModel = require('../models/Users');
require('dotenv').config(); 

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadimg = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const userId = req.params.userId;
        const attribute = req.params.attribute;

        if (attribute !== 'certification' && attribute !== 'profilPic') {
            return res.status(400).json({ message: 'Invalid attribute' });
        }

     
        const updateObject = {};
        updateObject[attribute] = result.secure_url;

        const user = await userModel.findByIdAndUpdate(userId, updateObject, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Image uploaded successfully!', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error uploading image' });
    }
};



module.exports = {  uploadimg };
