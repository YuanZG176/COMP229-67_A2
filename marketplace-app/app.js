const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const connectDB = require('./config/db.config');
const productRoutes = require('./routes/products67');

// 初始化应用
const app = express();
require('dotenv').config();


var path = require("path");







// 中间件
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// 数据库连接
connectDB();

// 路由
app.use('/api/products', productRoutes);
app.use('/api', productRoutes);

// 错误处理
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
        },
    });
});




app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.render("error");
});








module.exports = app;
