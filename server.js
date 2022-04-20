const express = require("express");
const app = express();
const ejs = require('ejs')
const port = 3000;

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.set('views', 'html')

app.use("/", require("./routes/root"));
app.use("/forums", require("./routes/forums"));
app.use("/users", require("./routes/users"));
app.use("/blogs", require("./routes/blogs"));
app.use("/signup", require("./routes/signup"))

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
)

