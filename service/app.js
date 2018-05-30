const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');          // Form
const session = require('express-session');         // Session
const users = require('./api/users');               // 后台接口api
const views = require('./api/views');               // 前台接口api

let app = express();
    // form
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    // session
    app.use( session({
        secret: 'keyboard cat',
        cookie: ('name', 'value', {
            path: '/',
            httpOnly: true,
            secure: false,
            maxAge: 1000*60*60
        }),
        resave: true,
        saveUninitialized: true
    }));
    app.all('/api/users/*', (req, res, next) => {
        // 白名单
        if (req.originalUrl == '/api/users/login') {        // 登录
            return next();
        }
        if (req.originalUrl == '/api/users/homeUser') {     // 用户状态
            return next();
        }
        if (req.originalUrl == '/api/users/logOut') {       // 用户退出
            delete req.session.userId;
            return res.json({
                status: 1,
                session: false,
                info: 'success',
                result: ''
            });
        }
        if (!req.session.userId && req.session.userId!=0 ) {
            return res.json({
                status: 1,
                session: false,
                info: 'no session',
                result: ''
            });
        }
        return next();
    });

    // api
    app.use('/api/users', users);       // 后台
    app.use('/api', views);             // 前端

    // static -> views、users 静态资源
    app.use(express.static(path.join(__dirname, 'views')));
    app.get('/users', (req, res, next) => {
        return res.sendFile(__dirname + '/views/login.html');
    });
    app.get('/', (req, res, next) => {
        return res.sendFile(__dirname + '/views/index.html');
    });

    // 404
    app.get('*', (req, res) => {
        // console.log(req.originalUrl);
        return res.sendFile(__dirname + '/views/index.html');
    });

    // 端口
    app.listen(80);