const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/chatBot');

const historicSchema = new mongoose.Schema({
    created_at: String,
    lastMsgID: String,
}, {collection: "historic"})

const historicModel = mongoose.model("historic", historicSchema, "historic")







module.exports = {Mongoose: mongoose, HistoricModel: historicModel}
