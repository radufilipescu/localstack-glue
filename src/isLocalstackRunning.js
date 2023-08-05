"use strict";

const http = require('http');

module.exports = async function() {
    const status = await getStatus('http://localhost:4566');
    return status === 200;
}

function getStatus(url) {
    return new Promise((resolve, reject) => {
        http.get(url, (response) => {
            resolve(response.statusCode);
        }).on('error', (error) => {
            reject(error);
        });
    });
}