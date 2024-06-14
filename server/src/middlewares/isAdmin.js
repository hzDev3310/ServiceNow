const AdminKey = require("../models/Adminkey");

const isAdmin = async (req, res, next) => {
    const key = req.headers['authorization'];
    try {
        const admin = await AdminKey.findOne({ key });
        if (!admin) {
            return res.status(401).json({ message: "Invalid key" });
        }
        if (admin.isActive) {
            return res.status(401).json({ message: "Inactive key" });
        }
        req.adminKey = key;
        next(); 
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = isAdmin;