const { Schema, model } = require("mongoose");

const Report = new Schema(
    {
        userId: String,
        providerId: String,
        content: String
    },
    { timestamps: true }
);

const ReportModel = model("Report", Report);
module.exports = ReportModel;
