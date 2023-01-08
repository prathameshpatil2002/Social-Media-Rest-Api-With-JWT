const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");

const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");

const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const postOnUser = require("./routes/postOnUser");

dotenv.config({ path: "./config.env" });


const app = express();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("Connected to DB..."))
  .catch((err) => console.log(`DB Error: ${err.message}`));

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(expressValidator());


app.use("/api/posts", postRoutes);
app.use("/api/allposts", postOnUser);
app.use("/api/users", userRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is running on port ${port}.....`);
});
