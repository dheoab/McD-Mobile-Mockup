const Redis = require("ioredis");
const axios = require("axios");
const cors = require("cors");
const routerUser = require("./routers/routerUser");
const routerApp = require("./routers/routerApp");
const express = require("express");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/users", routerUser);
app.use("/apps", routerApp);

app.listen(port, (_) => console.log(`Orchestrator is working at port ${port}`));
