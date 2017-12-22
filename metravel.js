const express = require('express');

const app = express();

var fortune = require('./lib/fortune.js');

var handlebars = require('express-handlebars')
  .create({ defaultLayout: 'main' });

app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
  res.locals.showTests = app.get('env') !== 'production' &&
    req.query.test === '1';
  next();
});

app.get('/', (req, res) => {
  // res.type('text/plain');
  // res.send('Mardown travel')
  res.render('home')
})


app.get('/about', (req, res) => {
  // res.type('text/plain');
  // res.send('Page about');
  res.render('about', {
    fortune: fortune.getFortune(),
    pageTestScript: '/qa/tests-about.js'
  });
})

app.get('/tours/hood-river', (req, res) => {
  res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', (req, res) => {
  res.render('tours/request-group-rate');
});

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
