const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();
const loginAuth = require("../middlewares/authentication");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.post("/google", UserController.google);
router.get("/verify/:uniqueStr", UserController.verifyAccount);
router.get("/posts", UserController.getPosts);

router.use(loginAuth);

router.get("/", UserController.getUsers);
router.post("/post", upload.single("image"), UserController.addPost); //testing
router.get("/logout", UserController.logoutUser);
router.get("/online", UserController.getOnlineUsers);
router.post("/payment", UserController.userPayment); //testing
router.get("/premium", UserController.premium);
router.put("/edit/:id", upload.single("image"), UserController.editUser); //testing
router.post("/follow/:id", UserController.followUser);
router.get("/:id", UserController.getUserDetail);
module.exports = router;
