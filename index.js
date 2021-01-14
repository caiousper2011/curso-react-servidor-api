// file deepcode ignore UseCsurfForExpress: <comment the reason here>
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const PORT = 3000;
const app = express();
const {
  listarTarefaId,
  listarTarefas,
  cadastrarTarefa,
  atulizarTarefa,
  removerTarefa,
  concluirTarefa,
} = require("./controllers/gerenciar-tarefas");

app.use(cors()).use(bodyParser.json()).use(helmet()).disable("x-powered-by");

app.get("/gerenciador-tarefas", listarTarefas);

app.get("/gerenciador-tarefas/:id", listarTarefaId);

app.post("/gerenciador-tarefas", cadastrarTarefa);

app.put("/gerenciador-tarefas/:id/concluir", concluirTarefa);

app.put("/gerenciador-tarefas/:id", atulizarTarefa);

app.delete("/gerenciador-tarefas/:id", removerTarefa);

app.listen(PORT, () => {
  console.log(`servidor online maluco, na porta: ${PORT}`);
});
