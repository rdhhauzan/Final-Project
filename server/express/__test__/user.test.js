const app = require("../app");
const request = require("supertest");
const { User, Game, Post } = require("../models");
const { createToken } = require("../helpers/jwt");
const fs = require("fs");
const UserController = require("../controllers/UserController");
const Google = require("../lib/Google");

const testImage = "./__test__/assets/test.jpg";
const post = {
  title: "test",
  content: "content",
  GameId: 1,
};
const post2 = {
  title: "test2",
  content: "content",
  GameId: 1,
  imgUrl: "test.com",
  UserId: 1,
};

let Game1 = {
  name: "Mobile Legends",
  platform: ["Mobile"],
  maxPlayers: 5,
  rankList: [1, 2, 3, 4, 5, 6, 7, 8],
  roleList: ["Jungler", "Roamer", "Exp Lane", "Mid Lane", "Gold Lane"],
};

let uniqueStr1 = "user.test@mail.com";
let validToken;
let validToken2;
const user1 = {
  email: "user.test@mail.com",
  username: "User Test",
  password: "usertest",
  dob: "01/01/2022",
  domisili: "Address",
  gender: "male",
  isLogin: false,
  uniqueStr: createToken(uniqueStr1),
};
const user2 = {
  email: "user.test2@mail.com",
  username: "User Test",
  password: "usertest",
  dob: "01/01/2022",
  domisili: "Address",
  gender: "male",
  uniqueStr: createToken(uniqueStr1),
  isLogin: false,
};
const user3 = {
  email: "user.test3@mail.com",
  username: "User Test",
  password: "usertest",
  dob: "01/01/2022",
  domisili: "Address",
  gender: "male",
  isLogin: false,
  uniqueStr: createToken(uniqueStr1),
};
const user4 = {
  email: "user.test4@mail.com",
  username: "User Test",
  password: "usertest",
  dob: "01/01/2022",
  domisili: "Address",
  gender: "male",
  isLogin: false,
  uniqueStr: createToken(uniqueStr1),
};

beforeAll((done) => {
  User.create(user2).then((result) => {
    validToken = createToken({
      id: result.id,
    });
    return User.create(user3).then((result) => {
      validToken2 = createToken({
        id: result.id,
      });
      return Game.create(Game1)
        .then(() => {
          return Post.create(post2);
        })
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});

beforeEach(() => {
  jest.restoreAllMocks();
});

afterAll((done) => {
  User.destroy({ truncate: true, cascade: true, restartIdentity: true })
    .then((_) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
  Post.destroy({ truncate: true, cascade: true, restartIdentity: true })
    .then((_) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
  Game.destroy({ truncate: true, cascade: true, restartIdentity: true })
    .then((_) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

//google
it("Should return error when hit Login", (done) => {
  jest.spyOn(UserController, "google").mockRejectedValue("Error"); // you can pass your value as arg
  // or => User.findAll = jest.fn().mockRejectedValue('Error')
  request(app)
    .post("/users/google")
    .send(user1)
    .then((res) => {
      // expect your response here
      expect(res.status).toBe(500);
      expect(res.body.msg).toBe("Internal Server Error");
      done();
    })
    .catch((err) => {
      done(err);
    });
});

it("Should be return success when hit Login", (done) => {
  jest
    .spyOn(Google, "googleLogin")
    .mockResolvedValue({ email: "user.test@mail.com", given_name: "google" });

  request(app)
    .post("/users/google")
    .set("id_token", "token asal")
    .send(user1)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("email", expect.any(String));
      done();
    })
    .catch((err) => {
      done(err);
    });
});

//file upload
describe("Add post", () => {
  test("Successfully post with jpg image", async () =>
    request(app)
      .post("/users/post")
      .set("access_token", validToken)
      .field("title", post.title)
      .field("GameId", post.GameId)
      .field("content", post.content)
      .attach("image", testImage)
      .expect(200)
      .then((response) => {}));
});

describe("edit profile", () => {
  test("Successfully post with jpg image", async () =>
    request(app)
      .put("/users/edit/1")
      .set("access_token", validToken)
      .attach("image", testImage)
      .expect(200)
      .then((response) => {}));
});

//register
describe("Test Register users", () => {
  test("201 - Successfully Register users", async () => {
    let response = await request(app).post("/users/register").send(user4);
    expect(response.statusCode).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("email", user4.email);
  });
});

test("Bad Request Password, Username Null, 400", async () => {
  let response = await request(app)
    .post("/users/register")
    .send({ email: "tes1222t@mail.com" });
  expect(response.statusCode).toBe(400);
});

test("Bad Request Email, Username Null, 400", async () => {
  let response = await request(app)
    .post("/users/register")
    .send({ password: "test123" });
  expect(response.statusCode).toBe(400);
});

test("Bad Request Email Already Taken, 400", async () => {
  let response = await request(app).post("/users/register").send(user1);
  expect(response.statusCode).toBe(400);
  expect(response.body).toBeInstanceOf(Object);
});

test("Bad Request Email Format Not Valid, 400", async () => {
  let response = await request(app)
    .post("/users/register")
    .send({ email: "test123" });
  expect(response.statusCode).toBe(400);
  expect(response.body).toBeInstanceOf(Object);
});

test("Bad Request Password Length min 5, 400", async () => {
  let response = await request(app)
    .post("/users/register")
    .send({ password: "aaa" });
  expect(response.statusCode).toBe(400);
  expect(response.body).toBeInstanceOf(Object);
});

test("Bad Request Email Empty, 400", async () => {
  let response = await request(app).post("/users/register").send({ email: "" });
  expect(response.statusCode).toBe(400);
  expect(response.body).toBeInstanceOf(Object);
});

test("Bad Request Password Empty, 400", async () => {
  let response = await request(app)
    .post("/users/register")
    .send({ password: "" });
  expect(response.statusCode).toBe(400);
  expect(response.body).toBeInstanceOf(Object);
});

//verify
describe("Test verify users", () => {
  test("200 - Successfully Verify users", async () => {
    let response = await request(app)
      .get(`/users/verify/${user1.uniqueStr}`)
      .send(user1);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "msg",
      "Your email has been verified!"
    );
  });
  test("401 - Invalid Verify String", async () => {
    let response = await request(app).get(`/users/verify/131312321321`);
    expect(response.statusCode).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("msg", "Invalid Token");
  });
});

//login

describe("Test Login users", () => {
  test("200 - Successfully Login users", async () => {
    let response = await request(app).post("/users/login").send(user2);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
});

test("400 - Wrong Password", async () => {
  let response = await request(app)
    .post("/users/login")
    .send({ email: "user.test2@mail.com", password: "test1223" });
  expect(response.statusCode).toBe(400);
  expect(response.body.msg).toBe("Invalid email / Password");
});

test("400 - Email can't be null", async () => {
  let response = await request(app)
    .post("/users/login")
    .send({ email: "", password: "test1223" });
  expect(response.statusCode).toBe(400);
  expect(response.body.msg).toBe("Please Fill All Fields!");
});
test("400 - Password can't be null", async () => {
  let response = await request(app)
    .post("/users/login")
    .send({ email: "user.test2@mail.com", password: "" });
  expect(response.statusCode).toBe(400);
  expect(response.body.msg).toBe("Please Fill All Fields!");
});

test("400 - Email Not Found", async () => {
  let response = await request(app)
    .post("/users/login")
    .send({ email: "tes12ss22t@mail.com", password: "test1223" });
  expect(response.statusCode).toBe(400);
  expect(response.body.msg).toBe("Invalid email / Password");
});

test("200 Success Hello world", (done) => {
  request(app)
    .get("/")
    .then((response) => {
      const { body, status } = response;

      expect(status).toBe(200);
      done();
      expect(body).toEqual(expect.any(Object));
      expect(body).toHaveProperty("msg", "Hello world");
    })
    .catch((err) => {
      done(err);
    });
});

test("200 Success get users", (done) => {
  request(app)
    .get("/users")
    .set("access_token", validToken)
    .then((response) => {
      const { body, status } = response;

      expect(status).toBe(200);
      expect(Array.isArray(body)).toBeTruthy();
      expect(body.length).toBeGreaterThan(0);
      done();
    })
    .catch((err) => {
      done(err);
    });
});

it("Should return error when get users", (done) => {
  jest.spyOn(User, "findAll").mockRejectedValue("Error");
  request(app)
    .get("/users/")
    .set("access_token", validToken)
    .then((res) => {
      // expect your response here
      expect(res.status).toBe(500);
      expect(res.body.msg).toBe("Internal Server Error");
      done();
    })
    .catch((err) => {
      done(err);
    });
});

it("Should return error when update premium", (done) => {
  jest.spyOn(User, "update").mockRejectedValue("Error");
  request(app)
    .get("/users/premium")
    .set("access_token", validToken)
    .then((res) => {
      // expect your response here
      expect(res.status).toBe(500);
      expect(res.body.msg).toBe("Internal Server Error");
      done();
    })
    .catch((err) => {
      done(err);
    });
});

it("Should return error when get Posts", (done) => {
  jest.spyOn(Post, "findAll").mockRejectedValue("Error");
  request(app)
    .get("/users/posts")
    .then((res) => {
      // expect your response here
      expect(res.status).toBe(500);
      expect(res.body.msg).toBe("Internal Server Error");
      done();
    })
    .catch((err) => {
      done(err);
    });
});

it("Should return error when delete Posts", (done) => {
  jest.spyOn(Post, "destroy").mockRejectedValue("Error");
  request(app)
    .delete("/users/post/1")
    .set("access_token", validToken)
    .then((res) => {
      // expect your response here
      expect(res.status).toBe(500);
      expect(res.body.msg).toBe("Internal Server Error");
      done();
    })
    .catch((err) => {
      done(err);
    });
});

it("Should return error when get users", (done) => {
  jest.spyOn(User, "findAll").mockRejectedValue("Error");
  request(app)
    .get("/users/online")
    .set("access_token", validToken)
    .then((res) => {
      // expect your response here
      expect(res.status).toBe(500);
      expect(res.body.msg).toBe("Internal Server Error");
      done();
    })
    .catch((err) => {
      done(err);
    });
});

test("401 Failed get users Invalid Token", (done) => {
  request(app)
    .get("/users")
    .set("access_token", "INVALID")
    .then((response) => {
      const { body, status } = response;

      expect(status).toBe(401);
      expect(body).toEqual(expect.any(Object));
      expect(body).toHaveProperty("msg", "Invalid Token");
      done();
    })
    .catch((err) => {
      done(err);
    });
});

test("400 Failed get users No Token", (done) => {
  request(app)
    .get("/users")
    .then((response) => {
      const { body, status } = response;

      expect(status).toBe(400);
      expect(body).toEqual(expect.any(Object));
      expect(body).toHaveProperty("msg", "Invalid email / Password");
      done();
    })
    .catch((err) => {
      done(err);
    });
});

test("200 Success get online Users", (done) => {
  request(app)
    .get("/users/online")
    .set("access_token", validToken)
    .then((response) => {
      const { body, status } = response;

      expect(status).toBe(200);
      expect(Array.isArray(body)).toBeTruthy();
      done();
    })
    .catch((err) => {
      done(err);
    });
});

test("200 Success follow Users", (done) => {
  request(app)
    .post("/users/follow/2")
    .set("access_token", validToken)
    .then((response) => {
      const { body, status } = response;

      expect(status).toBe(200);
      expect(body).toHaveProperty("id", expect.any(Number));
      expect(body).toHaveProperty("FollowerId", expect.any(Number));
      expect(body).toHaveProperty("FollowedId", expect.any(Number));
      done();
    })
    .catch((err) => {
      done(err);
    });
});
test("400 Failed follow Users", (done) => {
  request(app)
    .post("/users/follow/1")
    .set("access_token", validToken)
    .then((response) => {
      const { body, status } = response;

      expect(status).toBe(400);
      expect(body).toEqual(expect.any(Object));
      expect(body).toHaveProperty("msg", "You can't follow yourself!");
      done();
    })
    .catch((err) => {
      done(err);
    });
});

test("200 Success get User detail", (done) => {
  request(app)
    .get(`/users/1`)
    .set("access_token", validToken)
    .then((response) => {
      const { body, status } = response;

      expect(status).toBe(200);
      expect(body).toHaveProperty("user", expect.any(Object));
      done();
    })
    .catch((err) => {
      done(err);
    });
});

test("200 Success logout User", (done) => {
  request(app)
    .get(`/users/logout`)
    .set("access_token", validToken)
    .then((response) => {
      const { body, status } = response;

      expect(status).toBe(200);
      expect(body).toHaveProperty("msg", "You have been logged out");
      done();
    })
    .catch((err) => {
      done(err);
    });
});

test("400 Failed logout User", (done) => {
  request(app)
    .get(`/users/logout`)
    .set("access_token", validToken)
    .send({ isLogin: false })
    .then((response) => {
      const { body, status } = response;

      expect(status).toBe(400);
      expect(body).toHaveProperty("msg", "Invalid email / Password");
      done();
    })
    .catch((err) => {
      done(err);
    });
});

test("404 No User detail", (done) => {
  request(app)
    .get(`/users/99`)
    .set("access_token", validToken)
    .then((response) => {
      const { body, status } = response;

      expect(status).toBe(404);
      expect(body).toEqual(expect.any(Object));
      expect(body).toHaveProperty("msg", "Data Not Found");
      done();
    })
    .catch((err) => {
      done(err);
    });
});

test("200 Success get Posts", (done) => {
  request(app)
    .get("/users/posts")
    .then((response) => {
      const { body, status } = response;

      expect(status).toBe(200);
      expect(Array.isArray(body)).toBeTruthy();
      expect(body.length).toBeGreaterThan(0);
      done();
    })
    .catch((err) => {
      done(err);
    });
});

test("200 Success get premium", (done) => {
  request(app)
    .get("/users/premium")
    .set("access_token", validToken)
    .then((response) => {
      const { body, status } = response;

      expect(status).toBe(200);
      expect(body).toEqual(expect.any(Object));
      expect(body).toHaveProperty("msg", "Your account is now premium");
      done();
    })
    .catch((err) => {
      done(err);
    });
});

test("200 Success payment", (done) => {
  request(app)
    .post("/users/payment")
    .set("access_token", validToken)
    .then((response) => {
      const { body, status } = response;

      expect(status).toBe(200);
      expect(body).toEqual(expect.any(Object));
      expect(body).toHaveProperty("redirect_url", expect.any(String));
      done();
    })
    .catch((err) => {
      done(err);
    });
});

test("200 Success get Posts by Game", (done) => {
  request(app)
    .get("/users/posts/1")
    .then((response) => {
      const { body, status } = response;

      expect(status).toBe(200);
      expect(Array.isArray(body)).toBeTruthy();
      expect(body.length).toBeGreaterThan(0);
      done();
    })
    .catch((err) => {
      done(err);
    });
});

test("404 Failed get Posts by Game", (done) => {
  request(app)
    .get("/users/posts/100")
    .then((response) => {
      const { body, status } = response;

      expect(status).toBe(404);
      expect(body).toEqual(expect.any(Object));
      expect(body).toHaveProperty("msg", "Data Not Found");
      done();
    })
    .catch((err) => {
      done(err);
    });
});

test("200 Success delete post", (done) => {
  request(app)
    .delete("/users/post/1")
    .set("access_token", validToken)
    .then((response) => {
      const { body, status } = response;

      expect(status).toBe(200);
      expect(body).toEqual(expect.any(Object));
      expect(body).toHaveProperty("msg", "Your post has been deleted");
      done();
    })
    .catch((err) => {
      done(err);
    });
});

test("404 No post Found", (done) => {
  request(app)
    .delete("/users/post/100")
    .set("access_token", validToken)
    .then((response) => {
      const { body, status } = response;

      expect(status).toBe(404);
      expect(body).toEqual(expect.any(Object));
      expect(body).toHaveProperty("msg", "Data Not Found");
      done();
    })
    .catch((err) => {
      done(err);
    });
});

test("403 Unaothorized delete post", (done) => {
  request(app)
    .delete("/users/post/2")
    .set("access_token", validToken2)
    .then((response) => {
      const { body, status } = response;

      expect(status).toBe(403);
      expect(body).toEqual(expect.any(Object));
      expect(body).toHaveProperty("msg", "You are not authorized!");
      done();
    })
    .catch((err) => {
      done(err);
    });
});
