const express = require('express');
const Invoice = require('../controller');
const router = express.Router();

function invoiceRoutes(handler) {
    router.route('')
        .get(handler(Invoice.getInvoiceList));
    router.route('/files')
        .post(handler(Invoice.uploadInvoice));
    router.route('')
        .post(handler(Invoice.saveInvoice));
    router.route('/:id')
        .patch(handler(Invoice.updateInvoice));

    return router;
}
module.exports = invoiceRoutes;

