const express = require('express');

const api = require('../api');
const config = require('../config');
const {app_path} = config.get('api');
const {routes} = require('./invoice');

const apiRoutes = function(middleware) {
    try {
        const router = express.Router();
        const {api: {cors, errorHandler}} = middleware;
        // enable CORS
        router.use(cors());

        console.log('app=======',`${app_path}/invoice`)

        //all the routes for test path
        router.use(`${app_path}/invoice`, routes(api.http));
       

        // handle api errors properly
        router.use(errorHandler);

        return router;
    } catch (e) {
        console.log(e);
    }
};

module.exports = apiRoutes;
