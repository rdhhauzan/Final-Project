const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();
const loginAuth = require("../middlewares/authentication");


const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);

router.use(loginAuth)

router.put("/edit/:id", upload.single("image"), UserController.editUser)
module.exports = router;
