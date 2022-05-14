const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const dbConfig = require('./config/database.config')
const UserRoute = require('./routes/UserRoutes')
const {create} = require("./controllers/userController");
const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

app.set('views engine', 'ejs');

app.use("/", require("./routes/root"));
app.use("/forums", require("./routes/forums"));
app.use("/users", require("./routes/users"));
app.use("/blogs", require("./routes/blogs"));
app.use("/signup", require("./routes/signup"));
app.use('/user', UserRoute);


app.listen(port, () =>
    console.log(`App listening at http://localhost:3000`)
)

