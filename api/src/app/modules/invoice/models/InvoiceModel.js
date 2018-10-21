const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
    Amount: {type: Number, required: true},
    Date: {type: Date, required: true},
    Receipient: {
        Name: { type: String},
        Surname: { type : String},
        Address: { type: String},
        Phone: { type: String}
    },
    Files: [{
        file: { type: String},
        key: { type: String}, 
        description: { type: String} 
    }],
    InvoiceFile: {type: String, required: true}
});

const InvoiceModel = mongoose.model('invoice', InvoiceSchema);
module.exports = InvoiceModel;
