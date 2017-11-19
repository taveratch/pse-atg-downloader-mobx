// import express from 'express';
// import proxy from 'http-proxy-middleware';
// import cors from 'cors';
// import url from 'url';
// import config from './config.json';

let express = require('express');
let proxy = require('http-proxy-middleware');
let cors = require('cors');
let url = require('url');

import config from '../config';

let app = express();

app.use(cors());

const getQuery = originalUrl => {
    let index = originalUrl.indexOf('q=');
    return originalUrl.substring(index+2);
};

let options = {
    target: config.proxy,
    router: (req) => {
        let q = getQuery(req.originalUrl);
        let parsedUrl = url.parse(q);
        let target = `${parsedUrl.protocol}//${parsedUrl.host}`;
        console.log('Target: ' + target);
        return target;
    },
    pathRewrite: (path, req) => {
        let q = getQuery(req.originalUrl);
        let parsedUrl = url.parse(q);
        let urlPath = parsedUrl.path;
        console.log('Path: ' + urlPath);
        return urlPath;
    },
    onProxyRes: (proxyRes, req, res) => {
        let q = getQuery(req.originalUrl);
        console.log('Proxying to ' + q);
        console.log('------');
    },
    onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('Authorization', req.headers['authorization'] || '');
        proxyReq.setHeader('Content-Type', req.headers['content-type'] || '');
    },
    onError: (err, req, res) => {
        console.log(err);
    },
    changeOrigin: true
};

app.use('/proxy', proxy(options));
app.use('/_api/*', proxy({
    target: config.api,
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        proxyReq.headers = req.headers;
    },
}));

export default app;