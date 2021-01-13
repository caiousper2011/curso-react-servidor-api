const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 3000;
const app = express();

app.use(cors()).use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`servidor online maluco, na porta: ${PORT}`);
});
