const { model, Schema } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const adminSchema = new Schema({
   key: String,
   isActive: {
      type: Boolean,
      default: false
   }
}, { timestamps: true });

const AdminKey = model("AdminKey", adminSchema);
module.exports = AdminKey ;