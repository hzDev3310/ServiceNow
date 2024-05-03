const ReportModel = require("../models/Reports");

const sendReport = async (req, res) => {
    const { userId, providerId, content } = req.body;
    try {
        const report = new ReportModel({ userId, providerId, content });
        await report.save();
        res.json({ message: "report sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error " + error });
    }
};

const getReports = async (req, res) => {
    try {
        const reports = await ReportModel.find();
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error " + error });
    }
};



module.exports = { sendReport ,getReports };
