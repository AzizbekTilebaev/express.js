const rt = require("express").Router();
const multer = require("multer");

const rateLimit = require("express-rate-limit");

const auth = require("express").Router();
const ac = require("./controller/auth.controller");
const av = require("./validation/auth.validation")
auth.post("/login", av.login, ac.login)

const uc = require("./controller/user.controller")
const uv = require("./validation/user.validation");
const { updateUser } = require("./service/user.service");
const upload = multer({});

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 4, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	// store: ... , // Redis, Memcached, etc. See below.
})

rt.get("/users", limiter, uc.getUsers);
rt.post("/users", upload.single("img"),  uv.createUser,  uc.createUser);
rt.get("/user/:id", uv.getById, uc.getUserById);
rt.put("/user/update/:id", uc.updateUser)
rt.delete("/user/delete/:id", uc.deleteUser)

app.get('/', (req, res) => {
  res.send('Server ishlayapti!');
});

module.exports = {rt, auth};
