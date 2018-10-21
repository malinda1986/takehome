
const Invoice = require('../models/InvoiceModel');
const InvoiceService = require('../service/Invoice');

const uploadInvoice = ({body,options}) => {
    return new Promise((resolve, reject) => {
        InvoiceService.saveFile(body.files.name, body.files.file)
        .then(fileName => {
            resolve(fileName)
        });
    });
};

const getInvoiceList = ({body,options}) => {
    return new Promise((resolve, reject) => {
        return Invoice.find()
        .then(result => {
            resolve(InvoiceService.formatInvoiceList(result))
        })
        .catch(e => {
            reject(e);
        })
    });
};

const saveInvoice = ({body,options}) => {
    return new Promise((resolve, reject) => {
        console.log(body)
        let invoice = new Invoice({
            Amount: body.frmData.amount,
            Date: body.frmData.date,
            Receipient: {
                Name: body.currentItem.name,
                Surname: body.currentItem.surname,
                Address: body.currentItem.address,
                Phone: body.currentItem.phone
            },
            Files: body.files,
            InvoiceFile: body.invoice
        });

       return  resolve(invoice.save());

    });
}

const updateInvoice = ({body,options}) => {
    return new Promise((resolve, reject) => {

    });
}


module.exports = {
    uploadInvoice,
    getInvoiceList,
    saveInvoice,
    updateInvoice
};
