const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


//user: admin
// pass:FB9c5i4AxAN3l0em



const uri = "mongodb+srv://admin:FB9c5i4AxAN3l0em@cluster0.s0nx3.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try {
    await client.connect();
    const serviceCollection = client.db('Clean-co').collection('service')
    const productCollection = client.db('Clean-co').collection('product')


    app.get("/products", async(req,res) =>{
        const result = await productCollection.find({}).toArray()
       /*  console.log(result) */
        res.send(result)
    })
    app.get("/services", async(req,res) =>{
      const result = await serviceCollection.find({}).toArray()
     /*  console.log(result) */
      res.send(result)
  })

  app.post("/add-service", async(req,res)=>{
    const data = req.body
    const result = await serviceCollection.insertOne(data)
    res.send(result)
  })

    app.post("/add-products", async(req,res)=>{

      try{
        const data = req.body
      const result = await productCollection.insertOne(data)
      res.send({status:true,result: result})
      } catch(error){
        res.send({status: false, result:error})
      }
      
       /* console.log(result) */
    })

    app.put("/update/:id", async(req,res)=>{
      const {id}= req.params;
      const data = req.body;
      const filter = {_id:ObjectId(id)};
      const updateDoc = {$set: data} ;
      const option = {upsert:true}
      const result = await serviceCollection.updateOne(filter,updateDoc,option)
      res.send({status: true,result})
    })

    app.delete("/delete-service/:id",async(req,res)=>{
      const {id} = req.params
      const filter = {_id:ObjectId(id)}
      const result = await serviceCollection.deleteOne(filter)
      res.send(result)
    })

  } finally {
    
  }
}
run().catch(console.dir);


//params
app.get("/user/:id", async (req,res)=>{
  const {id}= req.params
  res.send(id)
})

//query
app.get("/user", async (req,res)=>{
  const {name,age}= req.query
  res.send(name)
})

//query_body
app.get("/user2", async (req,res)=>{
  const data= req.body
  const name = data.name;
  const age= data.age
  res.json({name,age})
})

//html data
app.get('/', async (req, res) => {
  res.send(`<html><body><h2 style="color:red">Full Html context pathano jay</h2></body></html>`)
})

// html file send
app.get("/Home", async (req,res)=>{
    res.sendFile('D:/web-development/Milstone -12/conseptual final project/complete-project-serverSide/index.html')
})

app.listen(port, () => {
  console.log(`Clean-co running  on port ${port}`)
})