const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const PORT = 3000;
const app = express();

app.use(helmet()).use(cors()).use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`servidor online maluco, na porta: ${PORT}`);
});
