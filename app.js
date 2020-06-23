var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const houseRouter = require('./routes/house');
const questentRouter = require('./routes/questent');
const blacklistRouter = require('./routes/blacklisthub');
const authorizeRouter = require('./routes/authorize');
const others = require('./routes/others');
const advisory = require('./routes/advisory');
const user = require('./routes/user')
const session = require('express-session')
var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    resave: true, 
    saveUninitialized: true,
    secret:'aF,.j)wBhq+E9n#aHHZ91Ba!VaoMfC',
    cookie:{
        path:'/',
        httpOnly:true,
        maxAge:1*60*60*1000
    }
}))
app.use('/api',(req,res,next)=>{
    // console.log(req.headers.appid)
    let appid = req.headers.appid || ''
    if(req.url !== '/user/login' && appid != 'abic_h5'){
        if(!req.session || !req.session.username){
            res.json({
                error:'999999',
                data:"登录失效，请登录"
            })
        }
    }
    next()
})
app.use('/api/house', houseRouter);
app.use('/api/questent', questentRouter);
app.use('/api/black', blacklistRouter);
app.use('/api/authorize', authorizeRouter);
app.use('/api/others', others)
app.use('/api/advisory',advisory)
app.use('/api/user',user)
app.use('/public', express.static('public'));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    console.log(req.url)
        // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;