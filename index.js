const express = require('express');
const app = express();
const port = 3000;
require("dotenv").config();
const mongoClient = require('./mongo');


const userList = {};

class User {
  constructor(id, password, name, email) {
    this.id = id;
    this.password = password;
    this.name = name;
    this.email = email;
  }
}

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static('public'));

const _client = mongoClient.connect();

async function getUserCollection() {
  const client = await _client;
  return client.db("login").collection("User");
}

app.get("/", async (req, res) => {
  res.render('home', {
    message: '홈'
  });
});

app.get("/signup", (req, res) => {
  console.log("회원가입 페이지")
  res.render('signup', {
    
  });
});

app.post("/signup", async (req, res) => {
  const { idVal, pwVal, nameVal, emailVal } = req.body;
  const user = new User(idVal, pwVal, nameVal, emailVal);

  const createUserObject = (idVal, pwVal, nameVal, emailVal) => {
    return {
      userId: idVal,
      password: pwVal,
      name: nameVal,
      email: emailVal
    }
  }

  const collection = await getUserCollection();

  //중복 검사
  const checkUnique = await(async() => {
    const foundUser = await collection.findOne({ userId: idVal });

    if (foundUser) return false;
    else return true;
  })();

  if (!checkUnique) return res.status(400).send({ "status": "fail" });

  //Save
  await collection.insertOne(createUserObject(idVal, pwVal, nameVal, emailVal));

  //Read
  const userCollection = await collection.find({ userId: idVal }).toArray();
  console.log("USER COLLECTION : ", userCollection);

  res.status(200).send({"status" : "success"});
});

app.get("/login", (req, res) => {
  console.log("로그인 페이지")
  res.render('login', {
    
  });
});

app.post("/login", async (req, res) => {
  const { idVal, pwVal } = req.body;
  const collection = await getUserCollection();

  const existedUser = await collection.findOne({ userId: idVal, password: pwVal });
  if(existedUser) return res.status(200).send({ "status": "success" });
  else return res.status(400).send({ "status": "fail" });

});

app.post("/first", (req, res) => {
  const { data } = req.body;
  console.log(req.body);
  res.status(200).send(`성공, ${data}`);
})

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
