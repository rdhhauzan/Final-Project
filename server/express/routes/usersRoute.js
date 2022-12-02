const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();
const loginAuth = require("../middlewares/authentication");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.get("/verify/:uniqueStr", UserController.verifyAccount);

router.use(loginAuth);

router.get("/", UserController.getUsers);
router.post("/post", upload.single("image"), UserController.addPost);
router.get("/logout", UserController.logoutUser)
router.get("/online", UserController.getOnlineUsers);
router.put("/edit/:id", upload.single("image"), UserController.editUser);
router.post("/follow/:id", UserController.followUser);
router.get("/:id", UserController.getUserDetail);
module.exports = router;
