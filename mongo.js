const { MongoClient } = require('mongodb');
const password = process.env.MONGO_PASSWORD;

const uri = `mongodb+srv://KAYA:${password}@cluster0.bo2dx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

module.exports = client