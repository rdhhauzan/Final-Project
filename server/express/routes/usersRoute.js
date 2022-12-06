const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();
const loginAuth = require("../middlewares/authentication");

const multer = require("multer");
const authorization = require("../middlewares/authorizeDeletePost");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.post("/google", UserController.google);
router.get("/verify/:uniqueStr", UserController.verifyAccount);
router.get("/posts", UserController.getPosts);
router.get("/posts/:id", UserController.getPostsByGameId);

router.use(loginAuth);

router.get("/", UserController.getUsers);
router.post("/post", upload.single("image"), UserController.addPost);
router.get("/logout", UserController.logoutUser);
router.get("/online", UserController.getOnlineUsers);
router.post("/payment", UserController.userPayment);
router.get("/premium", UserController.premium);
router.delete("/post/:id", authorization, UserController.deletePost);
router.put("/edit/:id", upload.single("image"), UserController.editUser);
router.post("/follow/:id", UserController.followUser);
router.get("/:id", UserController.getUserDetail);
module.exports = router;
