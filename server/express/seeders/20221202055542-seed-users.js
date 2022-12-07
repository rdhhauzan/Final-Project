"use strict";
const data = require("../data/users.json");
const { hashPassword } = require("../helpers/bcrypt");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    let users = await Promise.all(
      data.map(async (e) => {
        let uuid = uuidv4();
        try {
          const options = {
            method: "POST",
            url: "https://2269480a5983d987.api-us.cometchat.io/v3/users",
            headers: {
              apiKey: "dd160c53b176e730b4e702acbc12a2ddfc921eda",
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            data: {
              metadata: {
                "@private": {
                  email: "user@email.com",
                  contactNumber: "0123456789",
                },
              },
              uid: uuid,
              name: e.username,
              avatar: `https://avatars.dicebear.com/api/initials/${e.username}.svg`,
            },
          };

          await axios.request(options);
          e.uuid = uuid;
          e.createdAt = e.updatedAt = new Date();
          e.dob = new Date(e.dob);
          e.profPict = `https://avatars.dicebear.com/api/initials/${e.username}.svg`;
          e.isValid = true;
          e.isPremium = false;
          e.isLogin = true;
          e.password = hashPassword(e.password);
          return e;
        } catch (error) {
          console.log(error);
        }
      })
    );
    // const users = data.map((e) => {
    // let uuid = uuidv4();
    //   const options = {
    //     method: "POST",
    //     url: "https://2269480a5983d987.api-us.cometchat.io/v3/users",
    //     headers: {
    //       apiKey: "dd160c53b176e730b4e702acbc12a2ddfc921eda",
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //     },
    //     data: {
    //       metadata: {
    //         "@private": {
    //           email: "user@email.com",
    //           contactNumber: "0123456789",
    //         },
    //       },
    //       uid: uuid,
    //       name: e.username,
    //       avatar: `https://avatars.dicebear.com/api/initials/${e.username}.svg`,
    //     },
    //   };

    //   axios
    //     .request(options)
    //     .then(function (response) {
    //       console.log(response);
    //     })
    //     .catch(function (error) {});

    //   e.uuid = uuid;
    //   e.createdAt = e.updatedAt = new Date();
    //   e.dob = new Date(e.dob);
    //   e.profPict = `https://avatars.dicebear.com/api/initials/${e.username}.svg`;
    //   e.isValid = true;
    //   e.isPremium = false;
    //   e.isLogin = true;
    //   e.password = hashPassword(e.password);
    //   return e;
    // });
    await queryInterface.bulkInsert("Users", users);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users");
  },
};
