require("dotenv").config();

const cors = require("cors");
const express = require("express");
const app = express();
const router = require("./routers/router");

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(router);

module.exports = app;
