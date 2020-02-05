/* Desafio 01 Bootcamp Rocketseat Rotas no NodeJS
Rotas
POST /projects: A rota deve receber id e title dentro do corpo e cadastrar um 
novo projeto dentro de um array no seguinte formato: 
{ id: "1", title: 'Novo projeto', tasks: [] }; Certifique-se de enviar tanto o 
ID quanto o título do projeto no formato string com aspas duplas.

GET /projects: Rota que lista todos projetos e suas tarefas;

PUT /projects/:id: A rota deve alterar apenas o título do projeto com o id 
presente nos parâmetros da rota;

DELETE /projects/:id: A rota deve deletar o projeto com o id presente nos 
parâmetros da rota;

POST /projects/:id/tasks: A rota deve receber um campo title e armazenar uma 
nova tarefa no array de tarefas de um projeto específico escolhido através do 
id presente nos parâmetros da rota;
*/


//Middlewares
/*
Crie um middleware que será utilizado em todas rotas que recebem o ID do 
projeto nos parâmetros da URL que verifica se o projeto com aquele ID existe. 
Se não existir retorne um erro, caso contrário permita a requisição continuar 
normalmente;

Crie um middleware global chamado em todas requisições que imprime (console.log)
 uma contagem de quantas requisições foram feitas na aplicação até então;
*/

function checkIfProjectExist (req, res, next){
  const { id } = req.params;
  if(!projects.find(p => p.id == id)){
    return res.status(400).json({error: "Project not found with this id"})
  }

  return next();
}

let reqs = 0;
function checkReqs (req, res, next){
  reqs = reqs + 1
  console.log(reqs)

  next();
}

const express = require('express');

const server = express();

server.use(express.json());


const projects = [];
let id = 0;

server.get('/projects', checkReqs, (req, res)=>{
  return res.json(projects);
})

server.post('/projects', checkReqs, (req, res) => {
  const {title} = req.body;

  const project = {
    id,
    title,
    tasks:[]
  }

  id = id + 1

  projects.push(project);

  return res.json(projects);

})

server.post('/projects/:id/tasks',checkReqs, checkIfProjectExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
})

server.delete('/projects/:id', checkIfProjectExist, checkReqs,(req, res) => {
  const {id} = req.params

  const projectIndex = projects.findIndex(p => p.id == id);

  projects.splice(projectIndex, 1);

  return res.send();

})

server.put('/projects/:id', checkReqs, checkIfProjectExist, (req, res) => {
  const {id} = req.params;
  const {title} = req.body;

  const project = projects.find( p => p.id == id);
  project.title = title;

  return res.json(projects)
})

server.listen(3033);