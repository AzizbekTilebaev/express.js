const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const router = require("./router");
const path = require("path")
const cookieParser = require("cookie-parser")
const auth = require("./middleware/auth.middleware")

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser())
const imgPath = path.join(__dirname, "../public", "images");
app.use("/user/img/", express.static(imgPath))
app.use("/api/auth", router.auth)
app.use("/api", auth, router.rt);


module.exports = app;

app.listen(PORT, () => console.log(`server ${PORT}inan start boldi`))
