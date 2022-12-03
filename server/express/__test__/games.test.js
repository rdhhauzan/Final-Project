const app = require("../app");
const request = require("supertest");
const { User, Game } = require("../models");
const { createToken } = require("../helpers/jwt");

let Game1 = {
  name: "Mobile Legends",
  platform: ["Mobile"],
  maxPlayers: 5,
  rankList: [1, 2, 3, 4, 5, 6, 7, 8],
  roleList: ["Jungler", "Roamer", "Exp Lane", "Mid Lane", "Gold Lane"],
};

const user2 = {
  email: "user.test2@mail.com",
  username: "User Test",
  password: "usertest",
  dob: "01/01/2022",
  domisili: "Address",
  gender: "male",
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
  Game.create(Game1)
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
  Game.destroy({ truncate: true, cascade: true, restartIdentity: true })
    .then((_) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

test("200 Success get games", (done) => {
  request(app)
    .get("/games")
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

test("200 Success get game by id", (done) => {
  request(app)
    .get("/games/1")
    .then((response) => {
      const { body, status } = response;

      expect(status).toBe(200);
      expect(body).toHaveProperty("id", expect.any(Number));
      expect(body).toHaveProperty("name", expect.any(String));
      done();
    })
    .catch((err) => {
      done(err);
    });
});
test("404 Failed get game by id", (done) => {
  request(app)
    .get("/games/120")
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
