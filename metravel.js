const express = require('express');

const app = express();
var handlebars = require('express-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

var fortunes = [
"Победи свои страхи, или они победят тебя.",
"Рекам нужны истоки.",
"Не бойся неведомого.",
"Тебя ждет приятный сюрприз.",
"Будь проще везде, где только можно.",
];

app.get('/', (req, res) => {
  // res.type('text/plain');
  // res.send('Mardown travel')
  res.render('home')
})

app.get('/about', (req, res) => {
  // res.type('text/plain');
  // res.send('Page about');
  var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render('about', { fortune: randomFortune });
})

app.use((req, res) => {
  // res.type('text/plain');
  res.status(404);
  // res.send('404 Page not found');
  res.render('404');
})

app.use((err, req, res, next) => {
  console.error(err);
  // res.type('text/plain');
  res.status(500);
  // res.send('500 Server have a problem');
  res.render('500');
})

app.listen(app.get('port'), () => {
  console.log('Express is run on http://localhost:' + app.get('port') + 'type Ctrl+C for finish')
})
