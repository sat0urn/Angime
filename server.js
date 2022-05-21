require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override")
const mongoose = require('mongoose')
const encrypt = require('mongoose-encryption')
const dbConfig = require('./config/database.config')
const UserRoute = require('./routes/UserRoutes')
const ForumRoute = require('./routes/ForumRoutes')
const BlogRoute = require('./routes/BlogRoutes')
const cookieParser = require("cookie-parser")

const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database Connected Successfully!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

app.set('view engine', 'ejs');

app.use("/", require("./routes/root"));
app.use("/blogs", require("./routes/blogs"));
app.use("/signup", require("./routes/signup"));
app.use("/signing", require("./routes/signin"))
app.use("/account", require("./routes/myaccount"))

app.use('/users', UserRoute);
app.use('/forums', ForumRoute);
app.use('/blogs', BlogRoute);

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
)

