const express = require('express');
const app = express();
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view-engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs', {name: "Liby"});
});

app.post('/upload', (req, res) => {
  const message = req.body.message;
  const dataDir = __dirname + "/data/messages.json";
  let data = JSON.parse(fs.readFileSync(dataDir));
  data.push(message);
  fs.writeFileSync(dataDir, JSON.stringify(data, null, 2));
  res.redirect('/feed');
});
app.get('/feed', (req, res) => {
	fs.readFile('./data/messages.json', 'utf-8', (err, data) => {
		const messages = JSON.parse(data);
		res.render('feed.ejs', {messages: messages});
    }) 
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
