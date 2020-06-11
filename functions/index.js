const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors')({ origin: true });

const api = express();

api.use(cors);

api.get('/', (req, res) => {
    res.status(200).send({
        responseType: "redirect",
        responseBody: {
            responseMessage: "This path is being redirected to: https://documenter.getpostman.com/view/11693151/SzzehfqA"
        }
    });
});

api.get('/**', (req, res) => {
    res.status(406).send({
        responseType: "unacceptable",
        responseBody: {
            responseMessage: "We're not accepting GET requests at the moment, please refer: https://documenter.getpostman.com/view/11693151/SzzehfqA"
        }
    });
});

api.post('/utf8/uricomponent', (req, res) => {
    const inputValue = req.body.value;
    if (inputValue !== undefined) {
        const encodedValue = encodeURIComponent(inputValue);
        res.status(200).send({
            responseType: "ok",
            responseBody: {
                responseMessage: "success",
                originalText: inputValue,
                encodedValue: encodedValue,
                encodingType: "URIComponent"
            }
        });
    } else {
        res.status(422).send({
            responseType: "error",
            responseBody: {
                responseMessage: "Please use the 'value' parameter in the JSON body"
            }
        });
    }
});

api.post('/utf8/uri', (req, res) => {
    const inputValue = req.body.value;
    if (inputValue !== undefined) {
        const encodedValue = encodeURI(inputValue);
        res.status(200).send({
            responseType: "ok",
            responseBody: {
                responseMessage: "success",
                originalText: inputValue,
                encodedValue: encodedValue,
                encodingType: "URI"
            }
        });
    } else {
        res.status(422).send({
            responseType: "error",
            responseBody: {
                responseMessage: "Please use the 'value' parameter in the JSON body"
            }
        });
    }
});

exports.api = functions.https.onRequest(api);