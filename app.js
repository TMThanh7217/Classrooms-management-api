require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const classroomsRouter = require('./api/classrooms');
const accountRouter = require('./api/accounts');
const userRouter = require('./api/users');
const userClassroomRouter = require('./api/user_classrooms');
const assignmentRouter = require('./api/assignments');
const passport = require('./api/passport');
//const loginRouter = require('./api/passport/loginRouter')

const app = express();
const port = process.env.PORT || 9000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/sync', indexRouter);

// use authen inside each function + check user role there
app.use('/classrooms', classroomsRouter);
app.use('/account', accountRouter);
app.use('/user', userRouter);
app.use('/guest', userClassroomRouter);
app.use('/assignment', assignmentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  /*models.sequelize.sync()
  .then(() => {
    res.send('Databse sync successfully');
    console.log('Databse sync successfully');
  });*/
  console.log(`App is listening on port http://localhost:${port}`)
});

module.exports = app;
