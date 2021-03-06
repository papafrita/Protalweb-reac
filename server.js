
const express = require('express');
const app = express();
const path = require('path');
const consolidate = require('consolidate');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'portalweb'
});

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'templates'));

//middlewares
app.use('/static', express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/data-get-all-rut-user', function(req, res){
  connection.query('SELECT rut_alu as rut, contraseña, tipo_usuario FROM alumno', (error, results, fields) => {
    res.json(results);
  });
});
app.get('/data-get-all-rut-teacher', function(req, res){
  connection.query('SELECT rut_prof as rut, contraseña, tipo_usuario FROM profesor', (error, results, fields) => {
    res.json(results);
  });
});

app.get('/data-get-all-rut-admin', function(req, res){
  connection.query('SELECT rut_admin as rut, contraseña, tipo_usuario FROM administrador', (error, results, fields) => {
    res.json(results);
  });
});

app.get('/data-get-all-user', function(req, res){
  connection.query('SELECT * FROM alumno', (error, results, fields) => {
    res.json(results);
  });
});

app.get('/data-get-all-menu-teacher', function(req, res){
  connection.query
  ('SELECT profesor.rut_prof as rut, ramo.cod_ramo, ramo.nom_ramo, horario.cod_curso ,horario.num_dia ,horario.num_bloque,horario.sala_clases ,horario.hora  FROM profesor  inner join  ramo on profesor.rut_prof  = ramo.rut_prof  inner join horario on horario.cod_ramo=ramo.cod_ramo ',
  (error, results, fields) => {
    res.json(results);
  });
});
//,
app.get('/', (req, res) => res.render('sesion'));
 app.get('/sesion',(req,res)=> res.render('login'));
    app.get('/sesion/ajustes',(req,res)=> res.render('login'));
    app.get('/sesion/curso',(req,res)=> res.render('login'));
    app.get('/sesion/eventos',(req,res)=> res.render('login'));
    app.get('/sesion/horario',(req,res)=> res.render('login'));
    app.get('/sesion/notas',(req,res)=> res.render('login'));
    app.get('/sesion/perfil',(req,res)=> res.render('login'));
 app.get('/Admin',(req,res)=> res.render('login'));
    app.get('/Admin/mAlumno',(req,res)=> res.render('login'));
    app.get('/Admin/mProfesor',(req,res)=> res.render('login'));
    app.get('/Admin/mRamos',(req,res)=> res.render('login'));

 app.get('/Profesor',(req,res)=> res.render('login'));
    app.get('/Profesor/Eventos',(req,res)=> res.render('login'));
    app.get('/Profesor/Notas',(req,res)=> res.render('login'));
    app.get('/Profesor/Perfil',(req,res)=> res.render('login'));

const listener = app.listen(3000, () =>
  console.log(`Running app on ${listener.address().address}${listener.address().port}`)
);
