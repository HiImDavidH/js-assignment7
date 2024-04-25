const router = require('express').Router()
const bodyParser = require('body-parser')
const { getConnection, ObjectId } = require('./todo-db')
router.use(bodyParser.json()) // for parsing application/json
// const app = express()
// GET /api/todos

router.get('/', async (_, response) => {

	const collection = await getConnection('todo-api', 'todos')
	const todos = await collection.find({}).toArray()
	response.json(todos)//todos) 

})


// POST /api/todos

router.post('/', async (request, response) => {
    const  { item }  = request.body
    // const { body } = request
    // const   {item, complete}  =  body 
    // const input = item
    const collection = await getConnection('todo-api', 'todos')
    const nId = await collection.countDocuments()
    const result = await collection.insertOne({ id:nId +1, item:item, complete:false})
    response.json(result)
    })


// PUT /api/todos/:id

router.put('/:id', async (request, response) => {
    
    const { body, params } = request
    const { id } = params
    const { items } = body
    const collection = await getConnection('todo-api', 'todos')
   

    const todo = await collection.findOne({ _id: new ObjectId(id) })
    const complete = !todo.complete
    const result = await collection.updateOne({_id: new ObjectId(id) }, { $set: { complete } })
    response.send(result)
// const { id } = request.params
// const task = todos.find(todo => todo.id.toString() === id)
// task.complete = !task.complete // toggle the complete property
// response.json({ id:task.id, complete:task.complete})
})

module.exports = router
