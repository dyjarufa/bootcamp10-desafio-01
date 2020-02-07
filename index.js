const express = require('express')

const server = express();

server.use(express.json());

server.use(countCallRequest);

function countCallRequest(req, res, next) {
    console.log(`Método: ${req.method}; URL: ${req.url}`);
    return next();
}

function checkIfProjetExists(req, res, next) {
    const { id } = req.params;
    const idProject = projects.find(p => p.id == id);

    if (!idProject) {
        return res.status(401).json({ error: 'Project not found' })
    }

    return next();
}


const projects = [];

server.get('/projects', (req, res) => {
    return res.json(projects)
})

server.post('/projects', (req, res) => {
    const { id, title } = req.body;

    const project = {
        id,
        title,
        tasks: []
    }
    projects.push(project);

    return res.json(project);
})

server.put('/projects/:id', checkIfProjetExists, (req, res) => {
    const { id } = req.params
    const { title } = req.body
    const project = projects.find(pro => pro.id == id)
    project.title = title;

    return res.json(project);
})

server.delete('/projects/:id', checkIfProjetExists, (req, res) => {
    const { id } = req.params
    const index = projects.findIndex(p => p.id == id)
    projects.splice(index, 1);

    return res.json(projects);
})

server.post('/projects/:id/tasks', checkIfProjetExists, (req, res) => {
    const { id } = req.params
    const { title } = req.body

    const project = projects.find(p => p.id == id)

    project.tasks.push(title);

    return res.json(project)

})



server.listen(3000);