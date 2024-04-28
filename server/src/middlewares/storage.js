
const multer = require('multer');
// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Multer upload middleware


const upload = multer({ storage: storage }); 

module.exports = upload;
