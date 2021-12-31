const express = require('express')
const mongoose = require('mongoose');
const data = require('./post')
const app = express()
const port = 4000
const schema = mongoose.Schema

const postSchema = new schema({
  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  createAt: {
    type: String,
    index: true,
    unique: true,
  },
  author: String,
  category: String,
});

const Post= mongoose.model("Post", postSchema)

main().catch(err => console.log(err))

async function main() {
  await mongoose.connect('mongodb://localhost:27017/blog').then(()=>console.log("connection reusi"))
}

//mongoose.connect('mongodb://localhost:27017/nventory');

//const DB = "mongodb://localhost/inventory"

//mongoose.connect(DB)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.get('/api', (req, res) => {
    res.send(`
    <p>basic api rest<p/>
    <ul>
      <li> All post -<a href="/api/posts">api/posts</a> </li>
      

      </ul>
    `)
  })
  app.get('/api/posts', (req, res) => {

     Post.find({},(error,posts)=>{
      if(!error)  {
       //res.status(400).error(error)
      // return 
      console.log(error)
      }
      console.log(posts)
      res.send(posts)
    }) 
    


  })
  app.get('/api/posts/:id', (req, res) => 
  { const id = req.params.id
    const trier =  data.filter((item) => item.id == id)
      
    console.log(trier)
    res.send(trier[0])
  })