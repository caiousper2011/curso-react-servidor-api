// file deepcode ignore UseCsurfForExpress: <comment the reason here>
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const PORT = 3000;
const app = express();

app.use(cors()).use(bodyParser.json()).use(helmet()).disable("x-powered-by");

app.listen(PORT, () => {
  console.log(`servidor online maluco, na porta: ${PORT}`);
});
