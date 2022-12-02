const app = require("../app");
const request = require("supertest");
const { User } = require("../models");
const { createToken } = require("../helpers/jwt");

let uniqueStr1 = "user.test@mail.com";
let validToken;
const user1 = {
  email: "user.test@mail.com",
  username: "User Test",
  password: "usertest",
  dob: "01/01/2022",
  // isValid: false,
  // isPremium: false,
  // profPict:
  //   "https://static.vecteezy.com/system/resources/previews/007/698/902/original/geek-gamer-avatar-profile-icon-free-vector.jpg",
  domisili: "Address",
  gender: "male",
  // isLogin: false,
  uniqueStr: createToken(uniqueStr1),
};
const user2 = {
  email: "user.test2@mail.com",
  username: "User Test",
  password: "usertest",
  dob: "01/01/2022",
  // isValid: false,
  // isPremium: false,
  // profPict:
  //   "https://static.vecteezy.com/system/resources/previews/007/698/902/original/geek-gamer-avatar-profile-icon-free-vector.jpg",
  domisili: "Address",
  gender: "male",
  // isLogin: false,
  uniqueStr: createToken(uniqueStr1),
};
const user3 = {
  email: "user.test3@mail.com",
  username: "User Test",
  password: "usertest",
  dob: "01/01/2022",
  // isValid: false,
  // isPremium: false,
  // profPict:
  //   "https://static.vecteezy.com/system/resources/previews/007/698/902/original/geek-gamer-avatar-profile-icon-free-vector.jpg",
  domisili: "Address",
  gender: "male",
  // isLogin: false,
  uniqueStr: createToken(uniqueStr1),
};

beforeAll((done) => {
  User.create(user2)
    .then((result) => {
      validToken = createToken({
        id: result.id,
      });
    })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
  User.create(user3)
    .then((result) => {
      validToken = createToken({
        id: result.id,
      });
    })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

afterAll((done) => {
  User.destroy({ truncate: true, cascade: true, restartIdentity: true })
    .then((_) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

//register
describe("Test Register users", () => {
  test("201 - Successfully Register users", async () => {
    let response = await request(app).post("/users/register").send(user1);
    expect(response.statusCode).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("email", user1.email);
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

test("401 - Wrong Password", async () => {
  let response = await request(app)
    .post("/users/login")
    .send({ email: "tes1222t@mail.com", password: "test1223" });
  expect(response.statusCode).toBe(400);
  expect(response.body.msg).toBe("Invalid email / Password");
});

test("401 - Email Not Found", async () => {
  let response = await request(app)
    .post("/users/login")
    .send({ email: "tes12ss22t@mail.com", password: "test1223" });
  expect(response.statusCode).toBe(400);
  expect(response.body.msg).toBe("Invalid email / Password");
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

test("401 Failed get users No Token", (done) => {
  request(app)
    .get("/users")
    .set("access_token", null)
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

test("200 Success get online Users", (done) => {
  request(app)
    .get("/users/online")
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

test("200 Success follow Users", (done) => {
  request(app)
    .post("/users/follow/1")
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

test("200 Success get User detail", (done) => {
  request(app)
    .get(`/users/1`)
    .set("access_token", validToken)
    .then((response) => {
      const { body, status } = response;

      expect(status).toBe(200);
      expect(body).toHaveProperty("id", expect.any(Number));
      expect(body).toHaveProperty("email", expect.any(String));
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
