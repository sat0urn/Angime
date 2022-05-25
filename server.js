require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config');
const UserRoute = require('./routes/UserRoutes');
const ForumRoute = require('./routes/ForumRoutes');
const BlogRoute = require('./routes/BlogRoutes');
const GoogleRoute = require('./routes/GoogleRoutes')
const cookieParser = require("cookie-parser");
const session = require('express-session');
const passport = require('passport');
const {isLoggedIn, isAuth} = require('./middlewares/authMiddleware');
const flash = require('express-flash');
const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');

const app = express();
const port = process.env.PORT || 3000;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.set('view engine', 'ejs');
app.use(express.static("public"));

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database Connected Successfully!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(flash())
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize())
app.use(passport.session())

app.use("/", require("./routes/root"));
app.use("/signup", isAuth, require("./routes/signup"));
app.use("/signing", isAuth, require("./routes/signin"))
app.use("/account", isLoggedIn, require("./routes/myaccount"))

app.use('/users', UserRoute);
app.use('/forums', ForumRoute);
app.use('/blogs', BlogRoute);
app.use('/auth', GoogleRoute);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))

