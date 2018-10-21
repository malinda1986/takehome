const _ = require('lodash');
const fs = require('fs');

const formatInvoiceList = (list) => {
    return list
}

const saveFile = (name, file) => {
    const base64Data = file.replace(/^data:application\/pdf;base64,/, "");
    const fileName = Date.now()+ '_'+ name;
    return new Promise(resolve => {
        fs.writeFile( 'upload/'+ fileName, base64Data, 'base64', function(err, result) {
            resolve(fileName)
        });
    });
}

module.exports = {
    formatInvoiceList,
    saveFile
};