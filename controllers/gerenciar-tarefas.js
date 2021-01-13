const uuid = require("uuid");
let tarefas = [
  { id: 1, nome: "A Tarefa", concluida: false },
  { id: 2, nome: "B Tarefa", concluida: false },
  { id: 3, nome: "C Tarefa", concluida: false },
  { id: 4, nome: "D Tarefa", concluida: false },
];

const listarTarefaId = (req, res) => {
  const tarefaId = req.params.id;
  const tarefa = tarefas.filter(({ id }) => id == tarefaId);
  if (!tarefa.length) {
    res.status(404).json({ erro: "Tarefa não encontrada" });
  }
  res.json(tarefa.shift());
};

const listarTarefas = (req, res) => {
  const pagina = req.query["pag"] || 1;
  const ordem = req.query["ordem"];
  const filtroTarefa = req.query["filtro-tarefa"];
  const itemsPorPagina = req.query["items-por-pagina"] || 3;
  let tarefasRetornar = tarefas.slice(0);

  if (filtroTarefa) {
    tarefasRetornar = tarefasRetornar.filter(({ nome }) => {
      const expressaoFiltro = new RegExp(filtroTarefa.toLowerCase());
      return expressaoFiltro.test(nome.toLowerCase());
    });
  }
  console.log(tarefasRetornar);
  if (ordem === "ASC") {
    tarefasRetornar.sort(({ nome: nome1 }, { nome: nome2 }) =>
      nome1.localeCompare(nome2)
    );
  } else if (ordem === "DESC") {
    tarefasRetornar.sort(({ nome: nome1 }, { nome: nome2 }) =>
      nome2.localeCompare(nome1)
    );
  }
  return res.json({
    totalItems: tarefasRetornar.length,
    tarefas: tarefasRetornar
      .slice(0)
      .splice((pagina - 1) * itemsPorPagina, itemsPorPagina),
    pagina,
  });
};

const cadastrarTarefa = (req, res) => {
  const { nome } = req.body;
  if (!nome) {
    return res.status(400).json({ erro: "Requisição inválida" });
  }
  const tarefa = { id: uuid.v4(), nome, concluida: false };
  tarefas.push(tarefa);
  res.json(tarefa);
};

const atulizarTarefa = (req, res) => {
  const { id } = req.params;
  const { nome, concluida } = req.body;

  if (!nome || typeof concluida !== "boolean") {
    return res.status(400).json({ erro: "Requisição inválida" });
  }

  if (!tarefas.some((tarefa) => tarefa.id == id)) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }

  tarefas = tarefas.map((tarefa) => {
    if (tarefa.id == id) {
      tarefa = { ...tarefa, nome, concluida };
    }
    return tarefa;
  });

  res.json({ id, nome, concluida });
};

const removerTarefa = (req, res) => {
  const { id: tarefaId } = req.params;

  if (!tarefas.some((tarefa) => tarefa.id == tarefaId)) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }

  tarefas = tarefas.filter(({ id }) => id != tarefaId);

  res.json({ msg: "Tarefa removida com sucesso!" });
};

const concluirTarefa = (req, res) => {
  const { id } = req.params;

  if (!tarefas.some(({ id: tarefaId }) => tarefaId == id)) {
    res.status(404).json({ erro: "Tarefa não encontrada" });
  }

  tarefas = tarefas.map((tarefa) => {
    if (tarefa.id == id) {
      tarefa.concluida = true;
    }
    return tarefa;
  });

  res.json({ msg: "Tarefa concluida com sucesso!" });
};

module.exports = {
  listarTarefaId,
  listarTarefas,
  cadastrarTarefa,
  atulizarTarefa,
  removerTarefa,
  concluirTarefa,
};
