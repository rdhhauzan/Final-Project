const app = require("../app");
const request = require("supertest");
const { User, Game, UserGame } = require("../models");
const { createToken } = require("../helpers/jwt");
let Game1 = {
  name: "Mobile Legends",
  platform: ["Mobile"],
  maxPlayers: 5,
  rankList: [1, 2, 3, 4, 5, 6, 7, 8],
  roleList: ["Jungler", "Roamer", "Exp Lane", "Mid Lane", "Gold Lane"],
};

let validToken;
let validToken1;

const user1 = {
  email: "user.test@mail.com",
  username: "User Test",
  password: "usertest",
  dob: "01/01/2022",
  domisili: "Address",
  gender: "male",
  isLogin: true,
};
const user2 = {
  email: "user.test2@mail.com",
  username: "User Test",
  password: "usertest",
  dob: "01/01/2022",
  domisili: "Address",
  gender: "male",
  isLogin: true,
};

const usergames1 = {
  GameId: 1,
  UserId: 1,
  rank: 1,
  role: "test1",
  matchType: "fun",
  aboutMe: "test1",
};
const usergames2 = {
  rank: 1,
  GameId: 1,
  UserId: 1,
  role: "test2",
  matchType: "fun",
  aboutMe: "test2",
};
const usergames3 = {
  GameId: 1,
  UserId: 2,
  rank: 1,
  role: "test3",
  matchType: "fun",
  aboutMe: "test3",
};

beforeAll((done) => {
  User.create(user1).then((result) => {
    validToken1 = createToken({ id: result.id });
    return User.create(user2).then((result) => {
      validToken = createToken({
        id: result.id,
      });
      return Game.create(Game1).then(() => {
        return UserGame.create(usergames1).then(() => {
          return UserGame.create(usergames3)
            .then(() => {
              done();
            })
            .catch((err) => {
              done(err);
            });
        });
      });
    });
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
  Game.destroy({ truncate: true, cascade: true, restartIdentity: true })
    .then((_) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
  UserGame.destroy({ truncate: true, cascade: true, restartIdentity: true })
    .then((_) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

test("200 Success get all user games", (done) => {
  request(app)
    .get("/usergames")
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

test("200 Success get  user game by id", (done) => {
  request(app)
    .get("/usergames/1")
    .set("access_token", validToken)
    .then((response) => {
      const { body, status } = response;

      expect(status).toBe(200);
      expect(body).toHaveProperty("id", expect.any(Number));
      done();
    })
    .catch((err) => {
      done(err);
    });
});

test("404 failed to get  user game by id", (done) => {
  request(app)
    .get("/usergames/100")
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

test("201 Success create  user game", (done) => {
  request(app)
    .post("/usergames/1")
    .set("access_token", validToken)
    .send(usergames2)
    .then((response) => {
      const { body, status } = response;

      expect(status).toBe(201);
      expect(body).toHaveProperty(
        "msg",
        "Your game info has been successfully created!"
      );
      done();
    })
    .catch((err) => {
      done(err);
    });
});

test("404 failed to get  user game by id", (done) => {
  request(app)
    .post("/usergames/100")
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

test("200 Success update user game", (done) => {
  request(app)
    .put("/usergames/1")
    .set("access_token", validToken)
    .send(usergames2)
    .then((response) => {
      const { body, status } = response;

      expect(status).toBe(200);
      expect(body).toHaveProperty("msg", "Your game info has been updated!");
      done();
    })
    .catch((err) => {
      done(err);
    });
});

test("404 failed to update  user game by id", (done) => {
  request(app)
    .put("/usergames/100")
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

test("200 success matchmake", (done) => {
  request(app)
    .get("/usergames/match/1")
    .set("access_token", validToken)
    .then((response) => {
      const { body, status } = response;

      expect(status).toBe(200);
      expect(body).toHaveProperty("msg", "MATCH FOUND!");
      done();
    })
    .catch((err) => {
      done(err);
    });
});

test("404 failed matchmake", (done) => {
  request(app)
    .get("/usergames/match/100")
    .set("access_token", validToken)
    .then((response) => {
      const { body, status } = response;

      expect(status).toBe(404);
      expect(body).toHaveProperty(
        "msg",
        "No players found! please try again later!"
      );
      done();
    })
    .catch((err) => {
      done(err);
    });
});
