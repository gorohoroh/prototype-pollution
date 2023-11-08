import express from 'express';
import connect from "./database/connection.js";
import seedDatabase from "./database/seed.js";
import TodoItem from "./model/todoitem.model.js";
import lodash from "lodash";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;

app.post('/todos/add', (req, res) => {
    const defaults = {
        open: true,
    }
    console.log("Object prototype before merge: " + JSON.stringify({}.__proto__))
    const todoToAdd = lodash.merge(defaults, req.body)
    console.log("Object prototype after merge: " + JSON.stringify({}.__proto__))

    const todoItem = new TodoItem(todoToAdd);
    todoItem.save()
        .then(() => res.json({msg: `Successfully added a todo item`}))
        .catch(error => res.json({error: error.message}))
})

app.get('/todos/', (req, res) => {
    TodoItem.find({visible: true})
        .then(data => res.json(data))
        .catch(error => res.json({error}))
})

app.get('/todos/:id', (req, res) => {
    TodoItem.find({owner: req.params.id})
        .then(data => res.json(data))
        .catch(error => res.json({error}))
})

connect()
    .then(async () => {
        await seedDatabase();
        try {
            app.listen(port, () => {
                console.log(`Server connected to http://localhost:${port}`)
            })
        } catch (error) {
            console.log(`Unable to start to the Express server: ${error.message}`)
        }
    })
    .catch((error) => {
        console.log(`Invalid database connection: ${error.message}`)
    })
