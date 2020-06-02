const express = require('express');
const path = require('path');
const apiMocker = require('mocker-api');

const app = express();

apiMocker(app, path.resolve(__dirname, './mocker/mocker.js'))

app.listen(5000)